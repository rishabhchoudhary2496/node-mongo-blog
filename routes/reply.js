const express = require('express')
const router = express.Router()
const wagner = require('wagner-core')

wagner.invoke((Blog, validateReply, ReplyController) => {
  //injecting dependencies in controller
  ReplyController.setData(Blog, validateReply)
  router.post('/', ReplyController.postReply)
  router.put('/:id', ReplyController.updateReply)
  router.delete('/:id', ReplyController.deleteReply)
})

module.exports = router
