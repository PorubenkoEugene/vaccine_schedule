module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        'UserVaccines',
        [
            {
                id: 1,
                vaccine_name: 'BCJ',
                vaccination_date: '2018-11-10',
                user_email: 'wwu@sxsx.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                vaccine_name: 'Anti-grip',
                vaccination_date: '2012-11-15',
                user_email: 'wwaadu@sdxsx.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        {},
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('UserVaccines', null, {}),
};
