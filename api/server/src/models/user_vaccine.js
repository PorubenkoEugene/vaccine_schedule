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
      user_vaccine.belongsTo(models.users, {foreignKey: 'user_email'});
      user_vaccine.belongsTo(models.vaccines, {foreignKey: 'vaccine_name'})
      // define association here
    }
  };
  user_vaccine.init({
    vaccine_name: {
      type:DataTypes.STRING,
      references: {
        model: 'vaccines', // 'persons' refers to table name
        key: 'name', // 'id' refers to column name in persons table
      }
    },
    date: DataTypes.DATEONLY,
    user_email: {
      type: DataTypes.STRING,
      references: {
        model: 'users', // 'persons' refers to table name
        key: 'email', // 'id' refers to column name in persons table
      }
    }
  }, {
    sequelize,
    modelName: 'user_vaccines',
  });
  return user_vaccine;
};