import { Router } from 'express';
import { DeleteBoardByName, getBoardByName, getCategorizedBoards, postBoard, updateBoardById, getBoardById } from '../controllers/board.controllers.js';

const router = Router();

router.post('/post', postBoard);
router.get('/get/:name', getBoardByName);
router.get('/getById/:id', getBoardById);
router.get('/getTagBoards', getCategorizedBoards);
router.patch('/patch/:id', updateBoardById);
router.delete('/delete/:name', DeleteBoardByName);

export default router;