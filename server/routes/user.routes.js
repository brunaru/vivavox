import { Router } from 'express';
import { postUser, loginUser, updateUser } from '../controllers/user.controllers.js';

const router = Router();

router.post('/post', postUser);
router.post('/login', loginUser);
router.patch('/update/:id', updateUser);

export default router;