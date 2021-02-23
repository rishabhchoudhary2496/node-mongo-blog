const mongoose = require('mongoose')
const Joi = require('joi')
const deepPopulate = require('mongoose-deep-populate')(mongoose)
Joi.objectId = require('joi-objectid')(Joi)

const replySchema = mongoose.Schema({
  replyText: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const commentSchema = mongoose.Schema({
  commentText: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  replies: [replySchema],
})

const Comment = mongoose.model('Comment', commentSchema)

const validateComment = function (comment) {
  const schema = Joi.object({
    commentText: Joi.string().required(),
    blogId: Joi.objectId().required(),
  })
  return schema.validate(comment)
}

const validateCommentText = function (commentText) {
  const schema = Joi.object({
    commentText: Joi.string().required(),
  })
  return schema.validate(commentText)
}

const validateReply = function (reply) {
  const schema = Joi.object({
    replyText: Joi.string().required(),
    commentId: Joi.string().required(),
  })
  return schema.validate(reply)
}

commentSchema.plugin(deepPopulate, {
  populate: {
    userId: {
      select: '_id name profilePic',
    },
  },
})

replySchema.plugin(deepPopulate, {
  populate: {
    userId: {
      select: '_id name profilePic',
    },
  },
})

module.exports = {
  Comment,
  validateComment,
  validateReply,
  validateCommentText,
}
