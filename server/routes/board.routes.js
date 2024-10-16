import { Router } from 'express';
import { getBoardByName, postBoard } from '../controllers/board.controllers.js';

const router = Router();

router.post('/post', postBoard);
router.get('/get/:name', getBoardByName);

export default router;