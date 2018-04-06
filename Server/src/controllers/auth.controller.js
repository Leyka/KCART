const jwt = require('jsonwebtoken')
const path = require('path')
const config = require(path.resolve('config'))
const User = require('../models/user')

function generateJWT (user) {
  const oneWeek = 60 * 60 * 24 * 7
  return jwt.sign(user.toJSON(), config.auth.jwtSecret, {expiresIn: oneWeek})
}

class AuthController {
  async register (req, res) {
    try {
      let user = new User(req.body)
      user = await user.save()
      res.send({
        user,
        token: generateJWT(user)
      })
    } catch (err) {
      res.status(400).send({error: 'Adresse Email déjà utilisée'})
    }
  }

  async login (req, res) {
    const {email, password} = req.body
    try {
      // Check email
      const user = await User.findOne({email})
      if (!user) {
        return res.status(403).send({error: 'Votre email semble invalide'})
      }
      // Check password
      const validPassword = user.comparePassword(password)
      if (!validPassword) {
        return res.status(403).send({error: 'Votre mot de passe semble invalide'})
      }

      // User is valid, connect and generate token
      res.send({
        user,
        token: generateJWT(user)
      })
    } catch (err) {
      res.status(500).send({
        error: "Une erreur interne s'est produite lors de la connexion"
      })
    }
  }
}

module.exports = new AuthController()
