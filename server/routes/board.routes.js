import { Router } from 'express';
import { DeleteBoardByName, getBoardByName, postBoard } from '../controllers/board.controllers.js';

const router = Router();

router.post('/post', postBoard);
router.get('/get/:name', getBoardByName);
router.delete('/delete/:name', DeleteBoardByName);

export default router;