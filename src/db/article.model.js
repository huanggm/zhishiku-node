const Promise = require('bluebird')
const mongoose = require('./mongoose')
const schema = require('./article.schema')

/**
 * 初始化仓库
 */
schema.statics.initRepo = async function(owner, repo, articles) {
  await this.deleteRepo(owner, repo)
  return this.insertMany(articles)
}

/**
 * 删除仓库
 */
schema.statics.deleteRepo = function(owner, repo) {
  return this.deleteMany({
    owner,
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
