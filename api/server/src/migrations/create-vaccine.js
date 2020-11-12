module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Vaccine', {
            id: {
                allowNull: false,
                autoIncrement: true,
                // primaryKey: true,
                type: Sequelize.INTEGER
            },
            vaccine_name: {
                type: Sequelize.STRING
            },
            disease: {
                type: Sequelize.STRING
            },
            recommended_age: {
                type: Sequelize.INTEGER,
                // allowNull: false,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Vaccine');
    }
};