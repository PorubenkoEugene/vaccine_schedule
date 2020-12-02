
import database from '../src/models';
import Sequelize from "sequelize";
// import {literal} from "sequelize";

class VaccineService {
    static async getAllUserVaccines(id) {
        try {
            const vaccines = await database.vaccines.findAll({
                attributes: ['name'],

                include: [
                    {
                        model:database.users,
                        as: 'users', // name from model belongsTo('as':'users), where we define relationship
                        where: { id },
                        attributes: [],
                        through: {
                            // This block of code allows you to retrieve the properties of the join table
                            model: database.user_vaccines,
                            as: 'user_history',
                            attributes: [],
                        }
                    }
                ]
            });
            return vaccines
        } catch (error) {
            throw error;
        }
    }
    static async getUpcomingUserVaccines(id,interval='month'||'year') {

        try {
            const upcomingVaccine = await database.vaccines.findAll({
                where:{
                    [Sequelize.Op.and]:[
                        database.sequelize.literal(
                            `(SELECT age(u.birth_date) as birth_date from users u where id=${id})<make_interval(vaccines.recommended_age)`
                        ),
                        database.sequelize.literal(
                            `(SELECT age(u.birth_date+1) as birth_date from users u where id=${id})>make_interval(vaccines.recommended_age)`
                        ),
                    ]
                },
                attributes: ['name','disease']

                // include: [
                //     {
                //         model: database.users,
                //         as: 'users', // name from model belongsTo('as':'users), where we define relationship
                //         where: { id },
                //         attributes: ['birth_date'],
                //     }
                // ],
                // where:{recommended_age:}
            });
            return upcomingVaccine;
        } catch (error) {
            throw error;
        }
    }
    static async addVaccine(newVaccine) {
        try {
            const addedVaccine = await database.UserVaccines.create(newVaccine);
            return addedVaccine;
        } catch (error) {
            throw error;
        }
    }

    static async updateVaccine(id, updateVaccine) {
        try {
            const vaccineToUpdate = await database.Vaccine.findOne({
                where: { id: Number(id) }
            });

            if (vaccineToUpdate) {
                await database.Vaccine.update(updateVaccine, { where: { id: Number(id) } });
                return updateVaccine;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getSomeVaccines(id) {
        try {
            const Vaccines = await database.Vaccine.findOne({
                where: { id: Number(id) }
            });

            return Vaccines;
        } catch (error) {
            throw error;
        }
    }

    static async deleteVaccine(id) {
        try {
            const VaccineToDelete = await database.Vaccine.findOne({ where: { id: Number(id) } });

            if (VaccineToDelete) {
                const deletedVaccine = await database.Vaccine.destroy({
                    where: { id: Number(id) }
                });
                return deletedVaccine;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default VaccineService;