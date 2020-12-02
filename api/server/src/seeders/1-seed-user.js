module.exports = {
    up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert(
        'users',
        [
            {
                id:'1',
                name: 'Jane',
                last_name: 'Doe',
                email: 'wwu@sxsx.com',
                birth_date: '05-03-2001',
                password:'kokkok',
                // url_string: 'Jmko5DUnTNLaKBvU',
                // is_active: false,
                // refresh_token: '',
                // expires_in: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // {
                // id:'2',
                // name: 'Jon',
                // last_name: 'Dwow',
                // email: 'wwaadu@sdxsx.com',
                // birth_date: '24-11-2012',
                // password:'kokaxaxk',
                // url_string: 'Jmko5DonTNLaKBvU',
                // is_active: false,
                // refresh_token: '',
                // expires_in: '',
                // createdAt: new Date(),
                // updatedAt: new Date(),
            // },
        ],
        {},
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
