'use strict';
const { Model } = require('sequelize');
const bcrypt = require ('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsToMany(models.vaccines, {
        through: 'user_vaccines',
        foreignKey:'user_email',
        as: 'vaccines'
      })
      // define association here
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      primaryKey:true,
      unique:true,
      allowNull:false
    },
    birth_date: DataTypes.DATEONLY,
    password: DataTypes.STRING
  }, {
    // hooks: {
    //   beforeCreate: (user) => {
    //     // user.id = uuidv4();
    //     const salt = bcrypt.genSaltSync(10);
    //     user.password = bcrypt.hashSync(user.password, salt);
    //     user.url_string = randomString();
    //   }
    // },
    sequelize,
    modelName: 'users',

  });
  user.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  return user;
};