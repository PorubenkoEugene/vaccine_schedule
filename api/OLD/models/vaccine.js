module.exports = (sequelize, DataTypes) => {
    const Vaccine =  sequelize.define('Vaccine', {
        name: {
            type: DataTypes.STRING(30),
            unique: true,
        },
        disease: {
            type: DataTypes.STRING(255),
        },
        user_email: {
            type: DataTypes.STRING,
        },
        recommended_age: DataTypes.INTEGER,
    },{});

    Vaccine.associate = (models) => {
        Vaccine.belongsTo(models.User, {
            foreignKey: 'user_email',
            as: 'user'
        })
        // Vaccine.belongsToMany(models.User,{
        //     through: 'UserVaccines',
        //     foreignKey: 'name',
        //     as: 'user'
        // })
    };
    return Vaccine;
};