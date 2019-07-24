const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const moment = require('moment')

const config = require('../config')

const ArticleModel = require('../db/article.model')
const UserModel = require('../db/user.model')

const articleUtils = require('../utils/article')
const articleMetaUtils = require('../utils/articleMeta')

const userUtils = require('../utils/user')

const logger = require('../middleware/log4js').getLogger('router/article.js')

const Octokit = require('@octokit/rest')

/**
 * 保存文章
 * @必须登录
 */
router.post(
  '/saveArticle',
  asyncHandler(async (req, res) => {
    const { access_token } = req.session
    const { article } = req.body
    const { owner, repo, path, oldPath, sha, content_str } = article
    const octokit = Octokit({ auth: access_token })
    let found = null
    try {
      found = await octokit.repos.getContents({ owner, repo, path })
      found = found.data
    } catch(e) {
      found = null
    }
    logger.debug('found', found, owner, repo, path, oldPath, sha, content_str)
    if(sha) {
      if(oldPath === path) {
        //编辑文件
        await articleUtils.createOrUpdateFile(octokit, owner, repo, path, content_str, found.sha)
      } else {
        //重命名文件-不能重名
        if(found) {
          throw new Error('文件重名冲突')
        } else {
          logger.debug(1)
          await articleUtils.createOrUpdateFile(octokit, owner, repo, path, content_str)
          logger.debug(2)
          await articleUtils.deleteFile(octokit, owner, repo, oldPath)
          logger.debug(3)
        }
      }
    } else {
      //新建文件-不能重名
      if(found) {
        throw new Error('文件重名冲突')
      } else {
        logger.debug(4)
        await articleUtils.createOrUpdateFile(octokit, owner, repo, path, content_str)
        logger.debug(5)
      }
    }

    res.succeed('ok')
  })
)

/**
 * 删除文章
 * @必须登录
 */
router.post(
  '/deleteArticle',
  asyncHandler(async (req, res) => {
    const { access_token } = req.session
    const { article } = req.body
    const { owner, repo, path } = article
    const octokit = Octokit({ auth: access_token })
    const { data } = await octokit.repos.getContents({
      owner,
      repo,
      path,
    })
    const deleteResult = await octokit.repos.deleteFile({
      owner,
      repo,
      path,
      message: `删除文章-${path}`,
      sha: data.sha,
    })
    res.succeed('ok')
  })
)

/**
 * 获取文章详情
 */
router.get(
  '/getOriginalArticle',
  asyncHandler(async (req, res) => {
    const { owner, repo, path } = req.query
    const { access_token } = req.session

    const octokit = Octokit({ auth: access_token })

    const { data } = await octokit.repos.getContents({
      owner,
      repo,
      path,
    })

    data.owner = owner
    data.repo = repo
    data.content_str = Buffer.from(data.content, 'base64').toString('utf-8')

    res.succeed(data)
  })
)

/**
 * 获取某个用户的所有文章
 * @必须登录
 */
router.get(
  '/getArticles',
  asyncHandler(async (req, res) => {
    const page = req.query.page || 0
    const pageSize = config.PAGE_SIZE || 10
    const { userid } = req.session
    const total = await ArticleModel.getArticleCountByUser(userid)
    const articles = await ArticleModel.getArticlesByUser(
      userid,
      page,
      pageSize
    )
    res.succeed({
      hasMore: page * pageSize + articles.length < total,
      articles,
    })
  })
)

/**
 * 搜索某个用户的文章
 * @必须登录
 */
router.get(
  '/search',
  asyncHandler(async (req, res) => {
    const page = req.query.page || 0
    const pageSize = config.PAGE_SIZE || 10
    const { userid } = req.session
    const total = await ArticleModel.getArticleCountByUser(userid)
    const articles = await ArticleModel.getArticlesByUser(
      userid,
      page,
      pageSize
    )
    res.succeed({
      hasMore: page * pageSize + articles.length < total,
      articles,
    })
  })
)

module.exports = router
