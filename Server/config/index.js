require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    dialect: 'postgres',
    host: process.env.HOST || '192.168.1.2',
    database: process.env.DB_NAME || 'kcart_dev',
    user: process.env.DB_USER || 'kcart',
    password: process.env.DB_PASSWORD || 'qwerty'
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 's3cret'
  }
}
