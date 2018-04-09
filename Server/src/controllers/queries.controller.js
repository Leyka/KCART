const Query = require('../models/query')

class QueriesController {
  async all (req, res) {
    const queries = await Query.find({})
    res.send(queries)
  }

  async new (req, res) {
    const user = req.user
    const query = new Query(req.body)
    // Save query
    query.user = user.id
    await query.save()
    // Assign query to current user
    user.queries.addToSet(query)
    await user.save()
    res.send({user, query})
  }
}

module.exports = new QueriesController()
