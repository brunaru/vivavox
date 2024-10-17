import { Router } from 'express';
import { postCell, getAllCells, deleteCellById, deleteCellByText } from "../controllers/cell.controllers.js";

const router = Router();

// Registering a cell:
router.post('/post', postCell);
router.get('/get', getAllCells);
router.delete('/delete/:id', deleteCellById);
router.delete('/deleteByText/:text', deleteCellByText);

export default router;