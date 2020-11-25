module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Vaccines', {
            id: {
                allowNull: false,
                autoIncrement: true,
                // primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            disease: {
                type: Sequelize.STRING,
                allowNull: false,

            },
            recommended_age: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            user_email: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {         // User belongsTo Company 1:1
                    model: 'Users',
                    key: 'email'
                }
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
        return queryInterface.dropTable('Vaccines');
    }
};