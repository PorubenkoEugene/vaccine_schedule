import { Router } from 'express';
import VaccinationController from '../controllers/VaccinationController';
import { validate_jwt } from '../middlewares/validateJwt';
import { error } from '../middlewares/error';

const router = Router();

// router.get('/', validate_jwt, error, VaccinationController.getAllVaccines);
router.get('/:id', VaccinationController.getAllVaccines);
router.post('/', VaccinationController.addVaccine);
router.get('/', VaccinationController.getUpcomingVaccine);// upcoming vaccination
router.put('/:id', VaccinationController.updateVaccine);//
router.delete('/:id', VaccinationController.deleteVaccine);

export default router;