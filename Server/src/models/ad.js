const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * An ad is a Kijiji ad.
 * For now it's an ad related to a car
 * It's related to a query
 */
const AdSchema = new Schema({
  publicId: Number,
  link: String,
  description: String,
  price: Number,
  date: Date,
  address: String,
  sellerType: String,
  brand: String,
  model: String,
  edition: String,
  year: Number,
  drivetrain: String,
  kilometers: String,
  images: [String]
})

module.exports = mongoose.model('Ad', AdSchema)
