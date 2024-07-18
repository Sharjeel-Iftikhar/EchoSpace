import express from 'express'
import register from '../Controllers/auth.js';
const router = express.Router();

router.route('/signup').post(register);

export default router;