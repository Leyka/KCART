const bcrypt = require('bcrypt')

const hashPassword = (user, options) => {
  if (!user.changed('password')) {
    return
  }
  const saltRounds = 10
  const hash = bcrypt.hashSync(user.password, saltRounds)
  user.setDataValue('password', hash)
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password)
  }

  return User
}
