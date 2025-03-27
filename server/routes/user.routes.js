import { Router } from 'express';
import { postUser, loginUser } from '../controllers/user.controllers.js';

const router = Router();

router.post('/post', postUser);
router.post('/login', loginUser);

export default router;