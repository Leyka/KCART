// Import Controllers
const AuthController = require('./controllers/auth.controller')
const QueriesController = require('./controllers/queries.controller')
// Import Policies
const AuthPolicies = require('./policies/auth')

module.exports = app => {
  app.post('/register', AuthController.register)
  app.post('/login', AuthController.login)
  app.post('/queries/new', AuthPolicies.verifyToken, QueriesController.new)
}
