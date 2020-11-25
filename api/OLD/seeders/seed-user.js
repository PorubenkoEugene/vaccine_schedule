module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        'Users',
        [
            {
                id:'1',
                name: 'Jane',
                last_name: 'Doe',
                birth_date: '05-03-2001',
                email: 'wwu@sxsx.com',
                password:'kokkok',
                url_string: 'Jmko5DUnTNLaKBvU',
                is_active: false,
                refresh_token: '',
                expires_in: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id:'2',
                name: 'Jon',
                last_name: 'Dwow',
                birth_date: '24-11-2012',
                email: 'wwaadu@sdxsx.com',
                password:'kokaxaxk',
                url_string: 'Jmko5DonTNLaKBvU',
                is_active: false,
                refresh_token: '',
                expires_in: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        {},
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
