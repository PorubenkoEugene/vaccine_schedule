module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        'Users',
        [
            {
                id:'123e4567-e89b-12d3-a456-426614174000',
                name: 'Jane Doe',
                email: 'wwu@sxsx.com',
                password:'kokkok',
                urlString: 'Jmko5DUnTNLaKBvU',
                isActive: false,
                refreshToken: '',
                expiresIn: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id:'123e4567-e89b-12d3-a456-426614174001',
                name: 'Jon Dwow',
                email: 'wwaadu@sdxsx.com',
                password:'kokaxaxk',
                urlString: 'Jmko5DonTNLaKBvU',
                isActive: false,
                refreshToken: '',
                expiresIn: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        {},
    ),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
