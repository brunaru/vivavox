import { Router } from 'express';
import { postCell, getAllCells, deleteCellById, deleteCellByText, updateCellById, getCellById } from "../controllers/cell.controllers.js";

const router = Router();

// Registering a cell:
router.post('/post', postCell);
router.get('/get', getAllCells);
router.get('/get/:id', getCellById);
router.patch('/patch/:id', updateCellById);
router.delete('/delete/:id', deleteCellById);
router.delete('/deleteByText/:text', deleteCellByText);

export default router;