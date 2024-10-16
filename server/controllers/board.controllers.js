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