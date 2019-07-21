var mongoose = require('mongoose')

mongoose.Promise = require('bluebird')

// mongoose.connect('mongodb://zhishiku_mongo:27017/zhishiku', {
mongoose.connect('mongodb://matchmaker_mongo:27017/zhishiku', {
  useNewUrlParser: true,
})

mongoose.set('useCreateIndex', true)

module.exports = mongoose
