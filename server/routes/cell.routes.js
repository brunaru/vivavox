import { Router } from 'express';
import { postCell, getAllCells, deleteCellById } from "../controllers/cell.controllers.js";

const router = Router();

// Registering a cell:
router.post('/post', postCell);
router.get('/get', getAllCells);
router.delete('/delete/:id', deleteCellById);

export default router;