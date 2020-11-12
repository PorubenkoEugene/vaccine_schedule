module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('History', {
            // id: {
            //     allowNull: false,
            //     autoIncrement: true,
            //     // primaryKey: true,
            //     type: Sequelize.INTEGER
            // },
            vaccine_name: {
                type: Sequelize.STRING
            },
            vaccination_date: {
                type: Sequelize.DATE
            },
            user_email: {
                type: Sequelize.STRING
            },

        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('History');
    }
};