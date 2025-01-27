import UserCell from '../models/userCell.models.js';

export async function postUserCell(req, res) {
  try {
    // Instanciate an cell object:  
    const newUserCell = new UserCell({
      // user_id: req.body.user_id,
      original_cell_id: req.body.original_cell_id,
      text: req.body.text,
      img: req.body.img,
      color: req.body.color
    });

    // Store into the database:
    await newUserCell.save();

    res.status(201);
    res.send({message: "Cell successfuly created"});
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
}

export async function getAllUserCells(req, res) {
  try {
    const cells = await UserCell.find({});

    res.status(200);
    res.send(cells);
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
}

export async function getUserCellById(req, res) {
  try {
    const userCellId = req.params.id;

    const foundUserCell = await UserCell.findById(userCellId);

    if(!foundUserCell) {
      return res.status(404).send({ message: "User cell not found" });
    }

    res.status(200);
    res.send(foundUserCell);
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
}

export async function updateUserCellById(req, res) {
  try {
    const userCellId = req.params.id;
    const modifications = req.body;

    const modifiedUserCell = await UserCell.findByIdAndUpdate(userCellId, modifications, {new: true});

    if(!modifiedUserCell) {
      const newUserCell = new UserCell({
        ...req.body,
        original_cell_id: userCellId
      });

      await newUserCell.save();

      return res.status(201).send({ message: "User cell successfully modified (created)", newUserCell });
    }

    res.status(200);
    res.send("User cell successfully modified", modifiedUserCell);
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
}

export async function deleteUserCellById(req, res) {
  try {
    const deletedUserCell = await UserCell.findByIdAndDelete(req.params.id);

    if(!deletedUserCell) {
      return res.status(404).send({ message: "User cell not found" });
    }

    res.status(200);
    res.send("User cell successfully deleted");
  } catch(error) {
    res.status(404);
    res.send(error.message);
  }
}

export async function deleteAllUserCells(req, res) {
  try {
    const deletedUserCell = await UserCell.deleteMany({})

    if(!deletedUserCell) {
      return res.status(404).send({ message: "User cell not found" });
    }

    res.status(200);
    res.send("User cells successfully deleted");
  } catch(error) {
    res.status(404);
    res.send(error.message);
  }
}