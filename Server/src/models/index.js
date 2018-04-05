const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require(path.resolve('config'))
const db = {}

// Configure database
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    dialect: config.db.dialect,
    host: config.db.host,
    operatorsAliases: false,
    logging: false
  }
)

// Import all Models
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js') // Exclude this current file
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
