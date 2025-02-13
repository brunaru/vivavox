import { Router } from 'express';

import { postUserCell, getAllUserCells, getUserCellById, updateUserCellById, deleteUserCellById, deleteAllUserCells  } from "../controllers/userCell.controller.js";

const router = Router();

// Registering a cell:
router.post('/post', postUserCell);
router.get('/get', getAllUserCells);
router.get('/get/:id', getUserCellById);
router.patch('/patch/:id', updateUserCellById);
router.delete('/delete/:id', deleteUserCellById);
router.delete('/deleteAll', deleteAllUserCells);

export default router;