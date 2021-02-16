class UserController {
  static passport
  static User
  static validateUser

  static setData(passport, User, validateUser) {
    this.passport = passport
    this.User = User
    this.validateUser = validateUser
  }

  // @desc    login
  // @route   POST /login
  // @access  Public
  static login = async (req, res) => {
    this.passport.authenticate('local', function (error, user, info) {
      if (error) {
        console.log('error', error)
        return res.status(500).json(error)
      }
      if (!user) {
        return res.status(400).json(info.message)
      } else {
        req.login(user, function (err) {
          if (err) {
            console.log('err', err)
            return res.status(500).json(err)
          }
        })
      }
      res.status(200).json({
        user: {
          _id: user._id,
          email: user.email,
          profilePic: user.profilePic,
        },
      })
    })(req, res, next)
  }

  // @desc    logout
  // @route   GET /logout
  // @access  Private
  static logout = async (req, res) => {
    req.logout()
    return res.status(200).json('logout success')
  }

  // @desc    signup
  // @route   POST /signup
  // @access  Public
  static signUp = async (req, res) => {
    const { name, email, password } = req.body
    const { error } = this.validateUser({ name, email, password })

    if (error)
      return res.status(400).send({ message: error.details[0].message })

    if (!req.file)
      return res.status(400).send({ message: 'Profile pic required!' })

    let user = await this.User.findOne({
      email: email,
    })

    if (user)
      return res.status(400).json({
        message: 'user already exists!',
      })

    user = new User({
      name: name,
      email: email,
      password: password,
      profilePic: req.file.path,
    })
    await user.save()
    res.json({
      user: { name: user.name, email: user.email, profilePic: user.profilePic },
    })
  }
}

module.exports = UserController
