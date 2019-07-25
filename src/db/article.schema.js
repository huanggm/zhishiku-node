const moment = require('moment')
const mongoose = require('./mongoose')
const config = require('../config')

const Schema = mongoose.Schema
const schema = new Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    repo: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    original: String,
    content: String,
    tags: [String],
    imgs: [String],
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = schema
