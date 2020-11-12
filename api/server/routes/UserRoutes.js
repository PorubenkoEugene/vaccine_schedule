import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/registration', UserController.register);
router.get('/login', ( req, res )=>res.send('login page'));
router.post('/login', UserController.login);
router.get('/verify', UserController.verify);
router.get('/logout', UserController.logout)


export default router;
