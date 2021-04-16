const { Schema, model } = require('mongoose')//schema for bd  of comment
const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  entrie: {
    type: Schema.Types.ObjectId,
    ref: 'entries'
  },

  comment: String,

})
const Comment = model('Comment', commentSchema)
module.exports = Comment
