import express from 'express';
import { verifyToken } from '../middleware/auth.js';

import { createPost, getPosts, DeletePost,handlePostAction } from '../Controllers/post.js';


const router = express.Router();


router.post('/create',verifyToken, createPost);
router.get('/:userId',verifyToken, getPosts);
router.delete('/delete',verifyToken, DeletePost);
router.patch('/:postId/update',verifyToken, handlePostAction);

export default router;

// stay tuned for further upates

// router.get('/:userId/Drafts',verifyToken, DraftedPosts);