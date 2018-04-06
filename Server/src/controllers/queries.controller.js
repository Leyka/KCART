const Query = require('../models/query')
const User = require('../models/user')

class QueriesController {
  async new (req, res) {
    const user = await User.findById(req.user.id)
    const query = new Query(req.body)
    // Save query
    query.user = user.id
    await query.save()
    // Assign query to current user
    user.queries.push(query)
    user.save()

    res.send({user, query})
  }
}

module.exports = new QueriesController()
