import Board from "../models/board.models.js";
import Cell from "../models/cell.models.js";

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
    const validCells = await Cell.find({ _id: { $in: newBoard.cells } });
    if(validCells.length !== newBoard.cells.length) {
      return res.status(400).send({message: "Some cells are not valid"});
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

    const board = await Board.findOne({ name: nameKey }).populate('cells');

    if(!board) {
      return res.status(404).send({ message: "Board does not exist" });
    }

    res.status(200);
    res.send(board);
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
}

export async function updateBoardById(req, res) {
  try {
    const boardId = req.params.id;
    const modifications = req.body;
    
    const modifiedBoard = await Board.findByIdAndUpdate(boardId, modifications);

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

// export async function DeleteCellFromBoardById(req, res) {
//   try {
//     const deletedBoard = await Board.findOneAndDelete({ name: req.params.name });

//     if(!deletedBoard) {
//       return res.status(404).send({ message: "Board not found" });
//     }

//     res.status(200);
//     res.send("Board successfully deleted");
//   } catch(error) {
//     res.status(500);
//     res.send(error.message);
//   }
// }