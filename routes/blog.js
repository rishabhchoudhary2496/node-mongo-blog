const express = require('express')
const router = express.Router()
const wagner = require('wagner-core')

wagner.invoke((Blog, Comment, validateBlog, isAuth, BlogController) => {
  //injecting dependencies in controller
  BlogController.setData(Blog, Comment, validateBlog)
  router.get('/', isAuth, BlogController.getBlogList)
  router.get('/createBlog', isAuth, BlogController.writeBlog)
  router.post('/', isAuth, BlogController.createBlog)
  router.get('/:id', isAuth, BlogController.getBlog)
  router.put('/:id', isAuth, BlogController.updateBlog)
  router.delete('/:id', isAuth, BlogController.deleteBlog)
})

module.exports = router
