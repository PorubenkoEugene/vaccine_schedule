module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            "Vaccine",
            [
                {
                    id: 1,
                    vaccine_name: "BCJ",
                    disease: "Tubic",
                },
                {
                    id: 2,
                    vaccine_name: 'Anti-grip',
                    disease: 'Grip'
                }
            ],

            {}
        ),

    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete("Vaccine", null, {})
};