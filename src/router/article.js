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
  '/save',
  asyncHandler(async (req, res) => {
    const { owner, access_token } = req.session
    const { article } = req.body
    const octokit = Octokit({ auth: access_token })

    const content = await octokit.repos.getContents({
      owner: article.owner,
      repo: article.repo,
      path: article.path,
    })

    await octokit.repos.createOrUpdateFile(
      owner,
      article.repo,
      article.path,
      `${article.sha ? '编辑' : '新增'}文章-${article.title}`,
      articleUtils.encodeContent(article),
      article.sha
    )
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
    logger.debug(deleteResult)
    res.succeed('ok')
  })
)

/**
 * 获取文章详情
 */
router.get(
  '/getArticleById',
  asyncHandler(async (req, res) => {
    const article = await ArticleModel.getArticleById(req.query.id)
    res.succeed(article)
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
    logger.debug(total, typeof page, page,  page * pageSize + articles.length)
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
