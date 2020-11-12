const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

import randomString from "../../utils/RandomString";


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            unique: true,
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
        urlString: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: 'false',
        },
        refreshToken: {
            type: DataTypes.STRING,
        },
        expiresIn: {
            type: DataTypes.STRING,
        },
    },{
        hooks: {
            beforeCreate: (user) => {
                user.id = uuidv4();
                const salt = bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(user.password, salt);
                user.urlString = randomString();
            }
        },
    });
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    User.associate = (models) => {
        User.belongsTo(models.History, {
            foreignKey: 'user_email',
            // as: 'user_email',
            onDelete:'CASCADE',
        })
    };
    return User;
};
