const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

import randomString from "../../utils/RandomString";


module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        // },
        name: {
            type: DataTypes.STRING,
            // unique: true,
        },
        last_name: {
            type: DataTypes.STRING,
            // unique: true,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [7, 100]
            }
          },
        url_string: {
            type: DataTypes.STRING,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: 'false',
        },
        refresh_token: {
            type: DataTypes.STRING,
        },
        expires_in: {
            type: DataTypes.STRING,
        },
    },{
        hooks: {
            beforeCreate: (user) => {
                // user.id = uuidv4();
                const salt = bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(user.password, salt);
                user.url_string = randomString();
            }
        },
    });
    user.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    user.associate = (models) => {
        // console.log(models+ 'MODELS')
        // user.belongsTo(models.userVaccines, {
        //     foreignKey: 'user_email',
        //     as:'user_vaccines'
        // })
        user.hasMany(models.Vaccine, {
            // through: 'userVaccines',
            foreignKey:'user_email',
            as: 'vaccine'
        })
    };
    return user;
};
