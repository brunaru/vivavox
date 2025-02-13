import Board from "../models/board.models.js";
import Cell from "../models/cell.models.js";
import UserCell from "../models/userCell.models.js";

export async function postBoard(req, res) {
  try {
    const newBoard = new Board({
      name: req.body.name,
      numCells: req.body.numCells,
      cells: req.body.cells
    });

    // Check the number of cells coherency:
    if(newBoard.numCells !== newBoard.cells.length) {
      return res.status(400).send({message: "The number of cells is not coherent"});
    }

    // Check existency of board name:
    const existingBoard = await Board.findOne({ name: newBoard.name });
    if(existingBoard) {
      return res.status(400).send({message: "Board already exists with the given name"});
    }

    // Check valid cells:
    const validCells = await Promise.all(newBoard.cells.map(async (cell) => {
      let validCell;

      if(cell.cellType === 'cell') {
        validCell = await Cell.findById(cell.cellId);
      } else if(cell.cellType === 'userCell') {
        validCell = await UserCell.findById(cell.cellId);
      }

      return validCell ? cell : null;
    }));
    const invalidCells = validCells.filter(cell => cell === null);
    if(invalidCells.length > 0) {
      return res.status(400).send({ message: "Some cells are not valid"});
    }

    await newBoard.save();

    res.status(201);
    res.send("Board successfully created");
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
}

export async function getBoardByName(req, res) {
  try {
    const nameKey = req.params.name;

    // Finds the board:
    const board = await Board.findOne({ name: nameKey });
    if(!board) {
      return res.status(404).send({ message: "Board does not exist" });
    }
    // Populate cells:
    const populatedCells = await Promise.all(
      board.cells.map(async (cell) => {
        let populatedData = null;
        let originalCellId = null;

        if(cell.cellType === 'cell') {
          populatedData = await Cell.findById(cell.cellId);
          originalCellId = null;
        } else if(cell.cellType === 'userCell') {
          populatedData = await UserCell.findById(cell.cellId);
          originalCellId = cell.originalCellId || null;
        }

        if(!populatedData) {
          return null;
        }

        return {
          text: populatedData.text,
          img: populatedData.img,
          color: populatedData.color,
          _id: populatedData._id,
          originalCellId: originalCellId,
          cellType: cell.cellType
        };
      })
    );

    // Makes formated board to return:
    const filteredCells = populatedCells.filter(cell => cell !== null);
    const responseBoard = {
      _id: board._id,
      name: board.name,
      numCells: board.numCells,
      cells: filteredCells
    }

    res.status(200);
    res.send(responseBoard);
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
}

export async function updateBoardById(req, res) {
  try {
    const boardId = req.params.id;
    const modifications = req.body;
    
    const dbCells = modifications.cells.map((cell) => (
      {
        cellId: cell._id,
        cellType: cell.cellType
      }
    ));

    const dbBoard = {
      ...modifications,
      cells: dbCells
    }

    const modifiedBoard = await Board.findByIdAndUpdate(boardId, dbBoard);

    if(!modifiedBoard) {
      return res.status(404).send({ message: "Board not found" });
    }

    res.status(200);
    res.send("Board successfully modified");
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
}

export async function DeleteBoardByName(req, res) {
  try {
    const deletedBoard = await Board.findOneAndDelete({ name: req.params.name });

    if(!deletedBoard) {
      return res.status(404).send({ message: "Board not found" });
    }

    res.status(200);
    res.send("Board successfully deleted");
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
}










