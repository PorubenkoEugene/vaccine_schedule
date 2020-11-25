import randomString from "../../utils/RandomString";


module.exports = (sequelize, DataTypes) => {
    const UserVaccines = sequelize.define('UserVaccines', {
        vaccine_name: {
            type: DataTypes.STRING,
        },
        vaccination_date: {
            type: DataTypes.DATEONLY,
        },
        user_email: {
            type: DataTypes.STRING,
        },
    });
    UserVaccines.associate = (models) => {
        // UserVaccines.hasMany(models.User, {
        //     as: 'user'
        // });
        // UserVaccines.belongsTo(models.Vaccine, {
        //     foreignKey: 'name'
        // })
        // UserVaccines.belongsTo(models.User, {
        //     foreignKey: 'email'
        // })

    };
    return UserVaccines;
};
