import Cell from '../models/cell.models.js';

export async function postCell(req, res) {
  try {
    // Instanciate an cell object:  
    const newCell = new Cell({
      text: req.body.text,
      imageURL: req.body.img
    });

    // Checking existing cell text:
    const existingCell = await Cell.findOne({ text: newCell.text });
    if(existingCell) {
      return res.status(400).send({message: "The cell text is already in use"});
    }

    // Store it into the database:
    await newCell.save();

    res.status(201);
    res.send({message: "Cell successfuly created"});
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
}

export async function getAllCells(req, res) {
  try {
    const cells = await Cell.find({});

    res.status(200);
    res.send(cells);
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
}

export async function deleteCellById(req, res) {
  try {
    await Cell.findByIdAndDelete(req.params.id);

    res.status(200);
    res.send("Cell successfully deleted")
  } catch(error) {
    res.status(404);
    res.send(error.message);
  }
}