module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    brand: DataTypes.STRING,
    description: DataTypes.STRING
  })

  Car.associate = function (models) {
    Car.belongsTo(models.User)
  }

  return Car
}
