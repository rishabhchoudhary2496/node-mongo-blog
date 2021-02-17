const userRoute = require('./user')
const blogRoute = require('./blog')
const commentRoute = require('./comment')
const replyRoute = require('./reply')

module.exports = function (app) {
  app.use('/', userRoute)
  app.use('/blog', blogRoute)
  app.use('/comment', commentRoute)
  app.use('/reply', replyRoute)
}
