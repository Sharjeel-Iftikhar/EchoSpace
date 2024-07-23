import express from 'express'
import { verifyToken } from '../middleware/auth.js';
import {getUserFriends,addReomveFrnd} from '../Controllers/user.js'

const router = express.Router();

router.get('/:id/friends', verifyToken, getUserFriends);
router.patch('/:id/:friendId', verifyToken, addReomveFrnd);

export default router;