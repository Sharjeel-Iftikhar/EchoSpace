import express from 'express'
import {register,login} from '../Controllers/auth.js';
const router = express.Router();

router.route('/signup').post(register);
router.route('/login').post(login);

export default router;