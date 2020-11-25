module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UserVaccines', {
            id: {
                allowNull: false,
                // unique: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            vaccine_name: {
                type: Sequelize.STRING,
                // references: {         // User belongsTo Company 1:1
                //     model: 'Vaccines',
                //     key: 'name'
                // }
            },
            vaccination_date: {
                type: Sequelize.DATE
            },
            user_email: {
                type: Sequelize.STRING,
                // references: {         // User belongsTo Company 1:1
                //     model: 'User',
                //     key: 'email'
                // }

            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }

        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('UserVaccines');
    }
};