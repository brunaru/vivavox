import Cell from "../models/cell.models.js";
import UserCell from "../models/userCell.models.js";

export async function populateBoardCells(board) {
  const populatedCells = await Promise.all(
    board.cells.map(async (cell) => {
      let populatedData = null;

      if (cell.cellType === "cell") {
        populatedData = await Cell.findById(cell.cellId);
      } else if (cell.cellType === "userCell") {
        populatedData = await UserCell.findById(cell.cellId);
      }

      if (!populatedData) return null;

      return {
        text: populatedData.text,
        img: populatedData.img,
        color: populatedData.color,
        _id: populatedData._id,
        cellType: cell.cellType,
        categories: populatedData.categories,
      };
    })
  );

  const filteredCells = populatedCells.filter((cell) => cell !== null);

  return {
    _id: board._id,
    name: board.name,
    numCells: board.numCells,
    dimensions: board.dimensions,
    userId: board.userId,
    tags: board.tags,
    type: board.type,
    imgPreview: board.imgPreview,
    cells: filteredCells,
  };
}