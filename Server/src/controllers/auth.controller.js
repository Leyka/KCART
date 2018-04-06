const User = require('../models/user')

class AuthController {
  async register (req, res) {
    try {
      let user = new User(req.body)
      user = await user.save()
      res.send(user)
    } catch (err) {
      res.status(400).send({err: 'Email already used'})
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

      // User is valid, connect
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: "Une erreur interne s'est produite lors de la connexion"
      })
    }
  }
}

module.exports = new AuthController()
