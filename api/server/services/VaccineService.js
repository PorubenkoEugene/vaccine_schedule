
import database from '../src/models';

class VaccineService {
    static async getAllVaccines() {
        try {
            return await database.Vaccine.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async addVaccine(newVaccine) {
        try {
            return await database.Vaccine.create(newVaccine);
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