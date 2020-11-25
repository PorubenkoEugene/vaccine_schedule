'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user_vaccine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_vaccine.init({
    vaccine_id: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_vaccine',
  });
  return user_vaccine;
};