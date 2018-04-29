const jwt = require('jsonwebtoken')
const path = require('path')
const config = require(path.resolve('config'))
const User = require('../models/user')
const Location = require('../models/location')

function generateJWT (user) {
  const oneWeek = 60 * 60 * 24 * 7
  return jwt.sign(user.toJSON(), config.auth.jwtSecret, {expiresIn: oneWeek})
}

class AuthController {
  async register (req, res) {
    try {
      // Link location
      const locationPublicId = req.body.location
      const location = await Location.findOne({publicId: locationPublicId})
      // Create user
      let user = new User(req.body)
      user.location = location.id
      user = await user.save()
      res.send({
        user,
        token: generateJWT(user)
      })
    } catch (err) {
      res.status(400).send({error: 'Email address already used'})
    }
  }

  async login (req, res) {
    const {email, password} = req.body
    try {
      // Check email
      let user = await User.findOne({email}).populate('queries')
      if (!user) {
        return res.status(403).send({error: 'Your email seems invalid'})
      }
      // Check password
      const validPassword = user.comparePassword(password)
      if (!validPassword) {
        return res.status(403).send({error: 'Your password seems invalid'})
      }

      // User is valid, connect and generate token
      res.send({
        user,
        token: generateJWT(user)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An internal error has occured'
      })
    }
  }
}

module.exports = new AuthController()
