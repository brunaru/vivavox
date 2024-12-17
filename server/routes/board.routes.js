import { Router } from 'express';
import { DeleteBoardByName, getBoardByName, postBoard, updateBoardById } from '../controllers/board.controllers.js';

const router = Router();

router.post('/post', postBoard);
router.get('/get/:name', getBoardByName);
router.patch('/patch/:id', updateBoardById);
router.delete('/delete/:name', DeleteBoardByName);

export default router;