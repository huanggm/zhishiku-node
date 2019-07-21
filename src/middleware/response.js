module.exports = function(req, res, next) {
  res.fail = function(status, msg) {
    if (status.message) {
      const code = status.code || status.errno || 403
      return res.status(code).send(status.message)
    } else if (msg === undefined) {
      if (typeof status === 'number') {
        return res.status(status).send('操作失败了')
      } else {
        return res.status(403).send(msg)
      }
    } else {
      return res.status(status).send(msg)
    }
  }
  res.succeed = function(data) {
    return res.status(200).json(data)
  }
  next()
}
