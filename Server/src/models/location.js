const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * In Kijiji, location are set in numbers.
 * For instance, Montreal (label) is 80002 (publicId)
 */
const LocationSchema = new Schema({
  publicId: Number,
  label: String
})

module.exports = mongoose.model('Location', LocationSchema)
