// Import Controllers
const AuthController = require('./controllers/auth.controller')
const QueriesController = require('./controllers/queries.controller')
const AdsController = require('./controllers/ads.controller')
// Import Policies
const AuthPolicies = require('./policies/auth')

module.exports = app => {
  // Auth
  app.post('/register', AuthController.register)
  app.post('/login', AuthController.login)
  // Query
  app.get('/queries', QueriesController.all)
  app.post('/queries/new', AuthPolicies.verifyToken, QueriesController.new)
  // Ad
  app.get('/ads', AuthPolicies.verifyToken, AdsController.latest)
  app.post('/ads/populate', AdsController.populate)
}
