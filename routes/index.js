const userRoute = require('./user')
const blogRoute = require('./blog')

module.exports = function (app) {
  console.log('app')
  app.use('/', userRoute)
  app.use('/blog', blogRoute)
}
