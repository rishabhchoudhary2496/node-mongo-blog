const userRoute = require('./user')
const blogRoute = require('./blog')
const commentRoute = require('./comment')

module.exports = function (app) {
  console.log('app')
  app.use('/', userRoute)
  app.use('/blog', blogRoute)
  app.use('/comment', commentRoute)
}
