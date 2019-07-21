const moment = require('moment')
const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const rp = require('request-promise')

const config = require('../config')
const Constants = require('../constants')
const ArticleModel = require('../db/article.model')
const UserModel = require('../db/user.model')
const UserUtils = require('../utils/user')
const logger = require('../middleware/log4js').getLogger('router/webhook.js')
const Octokit = require('@octokit/rest')
const JSZip = require('jszip')
const Diff = require('diff')

/**
 * 接受GitHub数据的webhook
 */
router.all(
  '/',
  asyncHandler(async (req, res) => {
    const data = req.body
    const ownerId = data.repository.owner.id
    const owner = data.repository.owner.login
    const repo = data.repository.name
    const octokit = Octokit({ auth: req.session.access_token })
    const user = await UserModel.findOne({platform: Constants.GITHUB, id: ownerId}).exec()
    const userid = user._id
    if (data.hook && data.hook_id && data.zen) {
      await initRepo(octokit, userid, owner, repo)
    } else {
      const { before, after } = req.body
      await updateRepo(octokit, userid, owner, repo, before, after)
    }

    res.succeed('ok')
  })
)

/**
 * 第一次初始化仓库
 * 1. getTree 获取文件的sha值
 * 2. getArchiveLink 获取内容
 * @param {string} owner 作者
 * @param {string} repo 仓库
 */
async function initRepo(octokit, userid, owner, repo) {
  const zipball = await octokit.repos.getArchiveLink({
    owner,
    repo,
    archive_format: 'zipball',
    ref: 'refs/heads/master',
  })
  let articles = []
  const zip = await JSZip.loadAsync(Buffer.from(zipball.data))
  await zip.forEach(async (relativePath, file) => {
    if (!file.dir && /.md$/.test(relativePath)) {
      const content = await zip.file(relativePath).async('string')
      articles.push({
        userid,
        owner,
        repo,
        path: relativePath.slice(relativePath.indexOf('/') + 1),
        // tags: tags,
        content: content,
        date: file.date,
      })
    }
  })
  await ArticleModel.initRepo(owner, repo, articles)
}

/**
 * 更新仓库
 * @param {string} owner 作者
 * @param {string} repo 仓库
 * @param {string} before 旧sha
 * @param {string} after 新sha
 */
async function updateRepo(octokit, userid, owner, repo, base, head) {
  const compare = await octokit.repos.compareCommits({
    owner,
    repo,
    base,
    head,
  })
  let found = null
  await compare.data.files.forEach(async file => {
    switch (file.status) {
      case 'added':
        await ArticleModel.create({
          userid,
          owner,
          repo,
          path: file.filename,
          tags: [],
          content: Diff.applyPatch('', file.patch),
          date: new Date(),
        })
        break
      case 'removed':
        await ArticleModel.deleteOne({userid, owner, repo, path: file.filename }).exec()
        break
      case 'modified':
        found = await ArticleModel.findOne({
          userid,
          owner,
          repo,
          path: file.filename,
        }).exec()
        found.content = Diff.applyPatch(found.content, file.patch)
        await found.save()
        break
      case 'renamed':
        found = await ArticleModel.findOne({
          userid,
          owner,
          repo,
          path: file.previous_filename,
        }).exec()
        found.path = file.filename
        await found.save()
        break

      default:
        break
    }
  })
}

module.exports = router
