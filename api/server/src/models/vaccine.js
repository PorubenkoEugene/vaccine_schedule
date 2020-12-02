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
      vaccine.belongsToMany(models.users,{
          through: 'user_vaccines',
          foreignKey: 'vaccine_name',
          as: 'users'
      })
      // define association here
    }
  };
  vaccine.init({
    name: {
      type: DataTypes.STRING,
      primaryKey:true,
      unique:true,
      allowNull:false
    },
    disease: DataTypes.STRING,
    recommended_age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vaccines',
  });
  return vaccine;
};