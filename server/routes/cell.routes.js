import { Router } from 'express';
import { postCell, getAllCells, getCellsByText, deleteCellById, updateCellById, updateManyCells, cellColorReport, getCellById, deleteAllCells } from "../controllers/cell.controllers.js";
import { getUploadUrl, deleteImage } from "../controllers/image.controller.js";
const router = Router();

// Registering a cell:
router.post('/post', postCell);

router.get('/get', getAllCells);
router.get('/get/:id', getCellById);
router.get('/getByText/:text', getCellsByText);
router.get('/getCellColorReport', cellColorReport);
router.get('/uploadUrl', getUploadUrl);
router.delete('/deleteImage', deleteImage);

router.patch('/patch/:id', updateCellById);
router.patch('/patchMany', updateManyCells);

router.delete('/delete/:id', deleteCellById);
router.delete('/deleteAll', deleteAllCells);

export default router;