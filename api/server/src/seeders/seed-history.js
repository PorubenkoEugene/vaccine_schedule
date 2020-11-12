module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        'History',
        [
            {
                vaccine_name: 'BCJ',
                vaccination_date: new Date(),
                user_email: 'wwu@sxsx.com',
            },
            {
                vaccine_name: 'Anti-grip',
                vaccination_date: new Date(),
                user_email: 'wwaadu@sdxsx.com',
            },
        ],
        {},
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('History', null, {}),
};
