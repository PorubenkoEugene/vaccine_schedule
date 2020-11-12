import VaccineService from '../services/VaccineService';
import Util from '../utils/ResUtil';

const util = new Util();

class VaccinationController {
    static async getAllVaccines(req, res) {
            const { token } = res.locals;
            if(token) {
                console.log('SET Data')
                util.setAdditionalData({ token });
            }
            // console.log(token+'RES TOKEN');
            try {
                const allVaccines = await VaccineService.getAllNotes();
                if (allVaccines.length > 0) {
                    util.setSuccess(200, 'Vaccines retrieved', allVaccines);
                } else {
                    util.setSuccess(200, 'No Vaccines found');
                }
                return util.send(res);
            }
            catch (error) {
                    util.setError(400, error);
                    return util.send(res);
            }
    }

    static async addVaccine(req, res) {
        if (!req.body.vaccineName || !req.body.userId) {
            util.setError(400, 'Please fill in all required fields!');
            return util.send(res);
        }
        const newVaccine = req.body;
        try {
            const createdVaccine = await VaccineService.addNote(newVaccine);
            util.setSuccess(201, 'Vaccine Added!', createdVaccine);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updateVaccine(req, res) {
        const alteredVaccine = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updatedVaccine = await VaccineService.updateNote(id, alteredVaccine);
            if (!updatedVaccine) {
                util.setError(404, `Cannot find Vaccine with the id: ${id}`);
            } else {
                util.setSuccess(200, 'Vaccine updated', updatedVaccine);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getUpcomingVaccine(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }

        try {
            const Vaccine = await VaccineService.getNote(id);

            if (!Vaccine) {
                util.setError(404, `Cannot find Vaccine with the id ${id}`);
            } else {
                util.setSuccess(200, 'Found Vaccine', Vaccine);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteVaccine(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        }

        try {
            const vaccineToDelete = await VaccineService.deleteNote(id);

            if (vaccineToDelete) {
                util.setSuccess(200, 'Vaccine deleted');
            } else {
                util.setError(404, `Vaccine with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default VaccinationController;