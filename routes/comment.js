const express = require('express')
const router = express.Router()
const wagner = require('wagner-core')

wagner.invoke(
  (
    Comment,
    Blog,
    User,
    validateComment,
    validateCommentText,
    CommentController
  ) => {
    CommentController.setData(
      Comment,
      Blog,
      User,
      validateComment,
      validateCommentText
    )
    router.post('/', CommentController.postComment)
    router.get('/:blogId', CommentController.getBlogComments)
    router.put('/:id', CommentController.updateComment)
    router.delete('/:id', CommentController.deleteComment)
  }
)

module.exports = router
