import VaccineService from '../services/VaccineService';
import Util from '../utils/ResUtil';
import UserService from "../services/UserService";

const util = new Util();

class VaccinationController {
    static async getAllVaccines(req, res) {
        const { id } = req.params;
        // const { token } = res.locals;
        //     if(token) {
        //         console.log('SET Data')
        //         util.setAdditionalData({ token });
        //     }
            try {
                const allUserVaccines = await VaccineService.getAllUserVaccines(id);

                if (allUserVaccines.length > 0) {
                    util.setSuccess(200, 'Vaccines retrieved', allUserVaccines);
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
    static async getUpcomingVaccines(req, res) {
        const { id } = req.params;
        const { interval } = req.query;
        console.log(interval+'interval');
        try {
            const upcomingVaccines =
                await VaccineService.getUpcomingUserVaccines(id, interval);
            util.setSuccess(200, 'Vaccines retrieved', upcomingVaccines);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addVaccine(req, res) {
        if (!req.body.vaccineName || !req.body.email || !req.body.vaccinationDate) {
            util.setError(400, 'Please fill in all required fields!');
            return util.send(res);
        }
        const newVaccine = {
            vaccine_name: req.body.vaccineName,
            user_email: req.body.email,
            vaccination_date: req.body.vaccinationDate,
        };
console.log(JSON.stringify(newVaccine))
        try {
            const createdVaccine = await VaccineService.addVaccine(newVaccine);
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
            const updatedVaccine = await VaccineService.updateVaccine(id, alteredVaccine);
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
            const Vaccine = await VaccineService.getSomeVaccines(id);

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
            const vaccineToDelete = await VaccineService.deleteVaccine(id);

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