const express = require('express')
const router = express.Router()
const wagner = require('wagner-core')

wagner.invoke((Blog, validateBlog, BlogController) => {
  //injecting dependencies in controller
  BlogController.setData(Blog, validateBlog)
  router.get('/', BlogController.getBlogList)
  router.post('/', BlogController.createBlog)
  router.get('/:id', BlogController.getBlog)
  router.put('/:id', BlogController.updateBlog)
  router.delete('/:id', BlogController.deleteBlog)
})

module.exports = router
