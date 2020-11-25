'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_vaccines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        // primaryKey: true,
        type: Sequelize.INTEGER
      },
      vaccine: {
        type: Sequelize.STRING,
        references: {         // User hasMany Vaccines n:n
          model: 'vaccines',
          key: 'vaccine_name'
        }
      },
      date: {
        type: Sequelize.DATEONLY
      },
      user_email: {
        type: Sequelize.STRING,
        references: {         // Vaccine hasMany Users n:n
          model: 'users',
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_vaccines');
  }
};