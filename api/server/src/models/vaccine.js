'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class vaccine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      vaccine.belongsToMany(models.user,{
          through: 'UserVaccines',
          foreignKey: 'vaccine_id',
          as: 'user'
      })
      // define association here
    }
  };
  vaccine.init({
    vaccine_name: {
      type: DataTypes.STRING,
    },
    disease: DataTypes.STRING,
    recommended_age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vaccine',
  });
  return vaccine;
};