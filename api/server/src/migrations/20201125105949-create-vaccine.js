'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vaccines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        // primaryKey: true,
        type: Sequelize.INTEGER
      },
      vaccine_name: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false,
        primaryKey: true,
      },
      disease: {
        type: Sequelize.STRING
      },
      recommended_age: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('vaccines');
  }
};