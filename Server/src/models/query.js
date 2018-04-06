const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Query is a User's query to find ads
 * So user can have many queries,
 * and one query has many ads
 */
const QuerySchema = new Schema({
  brand: String,
  description: String,
  minPrice: Number,
  maxPrice: Number,
  user: { type: Schema.ObjectId, ref: 'User' },
  ads: [{ type: Schema.ObjectId, ref: 'Ad' }]
})

module.exports = mongoose.model('Query', QuerySchema)
