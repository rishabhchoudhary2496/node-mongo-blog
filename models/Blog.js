const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const replySchema = mongoose.Schema({
  reply: {
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
  replies: [replySchema],
})

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 500,
  },
  content: {
    type: String,
    required: true,
    minLength: 10,
  },
  tags: {
    type: ['string'],
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  Likes: { type: Number, default: 0 },
  disLikes: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  comments: [commentSchema],
})

const Blog = mongoose.model('Blog', blogSchema)

const validateBlog = function (blog) {
  const schema = Joi.object({
    title: Joi.string().required().min(5).max(500),
    content: Joi.string().required().min(10),
    authorId: Joi.objectId().required(),
  })
  return schema.validate(blog)
}

const validateComment = function (comment) {
  const schema = Joi.object({
    commentText: Joi.string().required(),
    userId: Joi.objectId().required(),
  })
  return schema.validate(comment)
}

const validateReply = function (reply) {
  const schema = Joi.object({
    reply: Joi.string().required(),
    userId: Joi.objectId().required(),
  })
  return schema.validate(reply)
}

module.exports = {
  Blog,
  validateBlog,
  validateComment,
  validateReply,
}
