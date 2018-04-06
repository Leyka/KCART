const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * An ad is a Kijiji ad.
 * It's related to a query
 */
const AdSchema = new Schema({
  public_id: String,
  url: String
})

module.exports = mongoose.model('Ad', AdSchema)
