const Promise = require('bluebird')
const mongoose = require('./mongoose')
const schema = require('./article.schema')

/**
 * 初始化仓库所有文章-首先删除文章
 */
schema.statics.initRepo = async function(userid, repo, articles) {
  await this.deleteRepo(userid, repo)
  return this.insertMany(articles)
}

/**
 * 删除仓库所有文章
 */
schema.statics.deleteRepo = function(userid, repo) {
  return this.deleteMany({
    userid,
    repo,
  }).exec()
}

/**
 * 查询文章数量
 */
schema.statics.getArticleCountByUser = function(userid) {
  return this.countDocuments({ userid }).exec()
}

/**
 * 文章分页
 */
schema.statics.getArticlesByUser = function(userid, page, pageSize) {
  return this.find(
    { userid },
    null,
    {
      sort: { createdAt: -1 },
    }
  )
    .skip(page * pageSize)
    .limit(pageSize)
    .lean()
    .exec()
}

module.exports = mongoose.model('articles', schema)
