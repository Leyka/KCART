/**
 * An ad is a Kijiji ad.
 * It's related to a query
 */

module.exports = (sequelize, DataTypes) => {
  const Ad = sequelize.define('Ad', {
    public_id: DataTypes.INTEGER,
    url: DataTypes.STRING
  })

  Ad.associate = function (models) {
    Ad.belongsTo(models.Query)
  }

  return Ad
}
