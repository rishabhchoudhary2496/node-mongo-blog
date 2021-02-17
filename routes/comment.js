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
    isAuth,
    CommentController
  ) => {
    CommentController.setData(
      Comment,
      Blog,
      User,
      validateComment,
      validateCommentText
    )
    router.post('/', isAuth, CommentController.postComment)
    router.get('/:blogId', CommentController.getBlogComments)
    router.put('/:id', isAuth, CommentController.updateComment)
    router.delete('/:id', isAuth, CommentController.deleteComment)
  }
)

module.exports = router
