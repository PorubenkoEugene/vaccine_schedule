module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            "Vaccines",
            [
                {
                    id: 1,
                    name: "BCJ",
                    disease: "Tubic",
                    recommended_age: 2,
                    user_email: 'wwu@sxsx.com',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    name: 'Anti-grip',
                    disease: 'Grip',
                    recommended_age: 12,
                    user_email: 'wwu@sxsx.com',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],

            {}
        ),

    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete("Vaccines", null, {})
};