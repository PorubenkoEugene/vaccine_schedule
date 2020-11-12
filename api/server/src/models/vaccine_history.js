import randomString from "../../utils/RandomString";


module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
        vaccine_name: {
            type: DataTypes.STRING,
            unique: true,
        },
        vaccination_date: {
            type: DataTypes.DATE,

        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        },
    });
    History.associate = (models) => {
        History.hasMany(models.User, {
            as: 'user',
            onDelete:'CASCADE',
        })
    };
    return History;
};
