/**
 * Query is a User's query to find ads
 * So user can have many queries,
 * and one query has many ads
 */

module.exports = (sequelize, DataTypes) => {
  const Query = sequelize.define('Query', {
    brand: DataTypes.STRING,
    description: DataTypes.STRING,
    min_price: DataTypes.INTEGER,
    max_price: DataTypes.INTEGER
  })

  Query.associate = function (models) {
    Query.belongsTo(models.User)
    Query.hasMany(models.Ad)
  }

  return Query
}
