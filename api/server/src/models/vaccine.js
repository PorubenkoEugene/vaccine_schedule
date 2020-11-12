module.exports = (sequelize, DataTypes) => {
    const Vaccine =  sequelize.define('Vaccine', {
        vaccine_name: {
            type: DataTypes.STRING(30),
            defaultValue:'',
        },
        disease: {
            type: DataTypes.STRING(255),
            defaultValue:'',
        },
        recommended_age: DataTypes.INTEGER,
    },{});

    Vaccine.associate = (models) => {
        Vaccine.belongsTo(models.History,{
            foreignKey: 'vaccine_name',
            as: 'vaccine',
            onDelete: 'CASCADE'
        })
    };
    return Vaccine;
};