// Import Controllers
const AuthController = require('./controllers/auth.controller')
const QuotesController = require('./controllers/auth.controller')
// Import Policies
const AuthPolicies = require('./policies/auth')

module.exports = app => {
  app.post('/register', AuthController.register)
  app.post('/login', AuthController.login)
  app.post('/quotes/new', AuthPolicies.verifyToken, QuotesController.new)
}
