const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const wagner = require('wagner-core')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const { connectToDB } = require('./utils/db')
app.use(express.json())

require('./bootstrap')(wagner)
require('./utils/passportConfig')(wagner)

app.use(
  session({
    secret: 'MySession',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'sessions',
    }),

    cookie: {
      maxAge: 2592000000,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use('/public', express.static(path.resolve(__dirname, 'public')))
app.set('view engine', 'pug')
require('./routes')(app)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
  connectToDB()
})
