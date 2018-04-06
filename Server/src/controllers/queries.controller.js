const Query = require('../models/query')
const User = require('../models/user')

class QueriesController {
  async new (req, res) {
    const user = await User.findById(req.user.id)
    const query = new Query(req.body)
    // FIXME: It pushes ref of queries without creating query
    user.queries.push(query)
    user.save()
    res.send(user.queries)
  }
}

module.exports = new QueriesController()
