const isAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

module.exports = isAuth
