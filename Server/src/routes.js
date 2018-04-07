// Import Controllers
const AuthController = require('./controllers/auth.controller')
const QueriesController = require('./controllers/queries.controller')
const AdsController = require('./controllers/ads.controller')
// Import Policies
const AuthPolicies = require('./policies/auth')

module.exports = app => {
  app.post('/register', AuthController.register)
  app.post('/login', AuthController.login)
  app.post('/queries/new', AuthPolicies.verifyToken, QueriesController.new)
  app.post('/ads/new', AuthPolicies.verifyToken, AdsController.new)
  app.post('/ads/populate', AdsController.populate)
}
