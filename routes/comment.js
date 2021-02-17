const express = require('express')
const router = express.Router()
const wagner = require('wagner-core')

wagner.invoke((Blog, validateComment, CommentController, mongoose) => {
  CommentController.setData(Blog, validateComment, mongoose)
  router.post('/', CommentController.postComment)
  router.put('/:id', CommentController.updateComment)
  router.delete('/:id', CommentController.deleteComment)
})

module.exports = router
