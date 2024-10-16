import { Router } from 'express';
import { postBoard } from '../controllers/board.controllers.js';

const router = Router();

router.post('/post', postBoard);

export default router;