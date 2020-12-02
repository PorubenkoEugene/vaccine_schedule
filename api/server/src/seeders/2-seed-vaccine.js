module.exports = {
    up: async (queryInterface, Sequelize) =>
        await queryInterface.bulkInsert(
            'vaccines',
            [
                {
                    id: 1,
                    name: 'BCJ',
                    disease: 'Tubic',
                    recommended_age: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                // {
                //     id: 2,
                //     vaccine_name: 'Anti-grip',
                //     disease: 'Grip',
                //     recommended_age: 12,
                //     createdAt: new Date(),
                //     updatedAt: new Date(),
                // }
            ],

            {}
        ),

    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete("vaccines", null, {})
};