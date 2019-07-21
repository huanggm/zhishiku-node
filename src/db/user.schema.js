const mongoose = require('./mongoose')

const Schema = mongoose.Schema
const schema = new Schema(
  {
    platform: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    node_id: String,
    avatar_url: String,
    html_url: String,
    email: String,
    repos: Array,
  },
  {
    timestamps: true,
  }
)

module.exports = schema
