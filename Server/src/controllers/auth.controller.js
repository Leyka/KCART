const { User } = require('../models')

class AuthController {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user)
    } catch (err) {
      res.status(400).send({err: 'Adresse email déjà utilisée'})
    }
  }

  async login (req, res) {
    const {email, password} = req.body
    try {
      // Check email
      const user = await User.findOne({ where: { email: email } })
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
        error: "Une erreur interne s'est produite lors de la connexion",
        err
      })
    }
  }
}

module.exports = new AuthController()
