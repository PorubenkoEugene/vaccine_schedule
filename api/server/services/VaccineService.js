
import database from '../src/models';

class VaccineService {
    static async getAllUserVaccines(id) {
        try {
            console.log('AAA')
            // return await database.UserVaccines.findAll({
            //         where: { user_email: email }
            const vaccineToUpdate = await database.User.findOne({
                where: { email: 'wwu@sxsx.com' },
                include: 'vaccine'
            });
            return vaccineToUpdate
                // include: database.Users,


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