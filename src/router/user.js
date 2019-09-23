const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const rp = require('request-promise')

const config = require('../config')
const Constants = require('../constants')
const ArticleModel = require('../db/article.model')
const UserModel = require('../db/user.model')
const UserUtils = require('../utils/user')
const logger = require('../middleware/log4js').getLogger('router/user.js')
const Octokit = require('@octokit/rest')
const JSZip = require('jszip')

/**
 * 保存用户信息
 */
router.get(
  '/loginWithCode',
  asyncHandler(async (req, res) => {
    const code = req.query.code
    const tokenObj = await rp.post(
      'https://github.com/login/oauth/access_token',
      {
        body: {
          client_id: config.CLIENT_ID,
          client_secret: config.CLIENT_SECRET,
          code: code,
        },
        json: true,
      }
    )
    const octokit = Octokit({ auth: tokenObj.access_token })
    const { data: user } = await octokit.users.getAuthenticated()

    let foundUser = await UserModel.findOne({platform: Constants.GITHUB, id: user.id}).exec()
    if(foundUser) {
      //仅仅更新数据
      await UserModel.saveUser(user)
    } else {
      user.platform = Constants.GITHUB
      foundUser = await UserModel.saveUser(user)
    }
    req.session.access_token = tokenObj.access_token
    req.session.userid = foundUser._id
    res.succeed('ok')
  })
)

/**
 * 获取用户信息
 * @必须登录
 */
router.get(
  '/getUser',
  asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.session.userid).exec()
    res.succeed(user)
  })
)

/**
 * 获取用户项目列表
 * @必须登录
 */
router.get(
  '/getRepos',
  asyncHandler(async (req, res) => {
    const { access_token, userid } = req.session
    const octokit = Octokit({ auth: access_token })
    const { data: repos } = await octokit.repos.list()
    repos.forEach(repo => (repo.connectStatus = Constants.CONNECT_NO)) //初始化关联状态为0未关联

    const user = await UserModel.findById(userid).exec()
    //合并已经关联的项目的数据
    user.repos.forEach(repo => {
      const found = repos.find(r => r.id === repo.id)
      if (found) {
        Object.assign(found, repo)
      } else {
        repos.push(repo)
      }
    })
    res.succeed(repos)
  })
)

/**
 * 关联项目
 * 1. 记录该项目信息，写入用户的repos属性
 * 2. 写入钩子webhook，监听push事件
 * @必须登录
 */
router.post(
  '/connectRepo',
  asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.session.userid).exec()
    const { repo } = req.body

    const found = user.repos.find(r => r.id === repo.id)
    if (!found) {
      const octokit = Octokit({ auth: req.session.access_token })
      const hook = await octokit.repos.createHook({
        owner: user.login,
        repo: repo.name,
        config: {
          url: 'http://18fb1cf8.ngrok.io/api/webhook',
          content_type: 'json',
          insecure_ssl: '0',
        },
      })
      repo.hook_id = hook.data.id
      repo.connectStatus = Constants.CONNECT_SUCCEED
      user.repos.push(repo)
      await user.save()
    }

    res.succeed('ok')
  })
)

/**
 * 取消关联项目
 * 1. 删除用户repos中关联的项目
 * 2. 删除项目中的所有文章
 * @必须登录
 */
router.post(
  '/unconnectRepo',
  asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.session.userid).exec()
    const { repo } = req.body
    const found = user.repos.find(r => r.id === repo.id)
    if (found) {
      user.repos = user.repos.filter(r => r.id !== repo.id)
      await user.save()
      await ArticleModel.deleteRepo(req.session.userid, repo.name)
      const octokit = Octokit({ auth: req.session.access_token })
      await octokit.repos.deleteHook({
        owner: repo.owner.login,
        repo: repo.name,
        hook_id: found.hook_id,
      })
    }
    res.succeed('ok')
  })
)

module.exports = router
