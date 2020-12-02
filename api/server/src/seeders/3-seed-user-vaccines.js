const users = [
    {
        id: 1,
        vaccine_name:'BCJ',
        date: '2018-11-10',
        user_email: 'wwu@sxsx.com',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    // {
    //     id: 2,
    //     vaccine: 'Anti-grip',
    //     date: '2012-11-15',
    //     user_email: 'wwu@sxsx.com',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    // },
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(queryInterface.bulkInsert(
                    'user_vaccines',users
                    ,
                    {},
                ))
            },2000)
        })
    },

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('user_vaccines', null, {}),
};
