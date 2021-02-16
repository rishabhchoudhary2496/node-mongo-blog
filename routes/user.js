const express = require('express')
const router = express.Router()
const wagner = require('wagner-core')

wagner.invoke(
  (passport, User, isAuth, multer, storage, validateUser, UserController) => {
    //injecting dependencies in controller
    UserController.setData(passport, User, validateUser)
    router.post('/login', UserController.login)
    router.get('/logout', isAuth, UserController.logout)

    const upload = multer({
      storage,
      limits: { fileSize: 1024 * 1024 * 5 },
    })

    router.post('/signup', upload.single('profilePic'), UserController.signUp)
  }
)

module.exports = router
