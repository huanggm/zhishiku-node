const mongoose = require('./mongoose')
const schema = require('./user.schema')

/**
 * 保存用户-新建或者更新
 */
schema.statics.saveUser = function(user) {
  return this.updateOne(
    {
      platform: user.platform,
      id: user.id,
    },
    user,
    {
      upsert: true,
      setDefaultsOnInsert: true,
    }
  ).exec()
}

module.exports = mongoose.model('users', schema)
