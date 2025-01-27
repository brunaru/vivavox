import { Router } from 'express';
import { postCell, getAllCells, deleteCellById, updateCellById, getCellById, deleteAllCells } from "../controllers/cell.controllers.js";

const router = Router();

// Registering a cell:
router.post('/post', postCell);
router.get('/get', getAllCells);
router.get('/get/:id', getCellById);
router.patch('/patch/:id', updateCellById);
router.delete('/delete/:id', deleteCellById);
router.delete('/deleteAll', deleteAllCells);

export default router;