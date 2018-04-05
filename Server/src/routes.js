// Import Controllers
const AuthController = require('./controllers/auth.controller')
// const AdsController = require('./controllers/ads.controller')

module.exports = app => {
  app.post('/register', AuthController.register)
  app.post('/login', AuthController.login)
}
