const logger = require('./log4js').getLogger('middleware/checkLogin.js')

const loginApiList = [
  '/api/user/getUser',
  '/api/user/getRepos',
  '/api/user/connectRepo',
  '/api/user/unconnectRepo',
  
  '/api/article/getAllArticlesByUser',
]

module.exports = function(req, res, next) {
  const { access_token, userid } = req.session
  if (access_token && userid) {
    next()
  } else if (!loginApiList.includes(req.path)) {
    next()
  } else {
    res.fail('什么操作')
  }
}
