module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                // type: Sequelize.UUID
                allowNull: false,
                autoIncrement: true,
                // primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            birth_date: {
                type: Sequelize.DATE
            },
            email: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
                unique: true,
                // references: {         // User belongsTo Company 1:1
                //     model: 'UserVaccines',
                //     key: 'user_email'
                // }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            url_string: {
                type: Sequelize.STRING
            },
            is_active: {
                type: Sequelize.BOOLEAN
            },
            refresh_token: {
                type: Sequelize.STRING
            },
            expires_in: {
                type: Sequelize.STRING
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
    down: (queryInterface) => {
        return queryInterface.dropTable('Users');
    }
};
