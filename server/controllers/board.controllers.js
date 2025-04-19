import Board from "../models/board.models.js";
import Cell from "../models/cell.models.js";
import UserCell from "../models/userCell.models.js";

export async function postBoard(req, res) {
  try {
    const newBoard = new Board({
      name: req.body.name,
      numCells: req.body.numCells,
      type: req.body.type,
      userId: req.body.userId,
      tags: req.body.tags,
      cells: req.body.cells,
      imgPreview: req.body.imgPreview
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
      userId: board.userId,
      tags: board.tags,
      type: board.type,
      imgPreview: board.imgPreview,
      cells: filteredCells
    }

    console.log(`Fetch no board ${responseBoard.name}`);
    res.status(200);
    res.send(responseBoard);
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
}

export async function getCategorizedBoards(req, res) {
  try {
    const allBoards = await Board.find({}).lean();

    // Reduzir a lista de boards a um objeto de categorias
    const categorized = allBoards.reduce((acc, board) => {
      // 'acc' é o acumulador (o objeto com as categorias que estamos construindo)
      // 'board' é o board atual sendo processado

      // Verifica se o campo 'tags' existe, é um array e não está vazio
      if (Array.isArray(board.tags) && board.tags.length > 0) {
        // Itera sobre CADA tag dentro do array 'tags' do board atual
        board.tags.forEach(tag => {
          // Usa a tag como a chave da categoria.
          // Opcional: Limpar/normalizar a tag (remover espaços, converter para minúsculas, etc.)
          // const categoryKey = tag.trim().toLowerCase();
          const categoryKey = tag.trim().toLocaleLowerCase();

          // Se a categoria (chave) ainda não existe no acumulador 'acc',
          // inicializa-a como um array vazio.
          if (!acc[categoryKey]) {
            acc[categoryKey] = [];
          }

          // Adiciona o board ATUAL ao array correspondente à categoria (tag).
          // O mesmo board pode ser adicionado a múltiplas categorias se tiver múltiplas tags.
          acc[categoryKey].push(board);
        });
      } else {
        // Opcional: Se um board não tiver tags ou o campo 'tags' estiver ausente/vazio,
        // você pode adicioná-lo a uma categoria padrão como 'Outros'.
        const defaultCategory = 'Outros';
        if (!acc[defaultCategory]) {
          acc[defaultCategory] = [];
        }
        acc[defaultCategory].push(board);
      }

      // Retorna o acumulador atualizado para a próxima iteração do reduce.
      return acc;

    }, {}); // O `{}` inicializa o acumulador como um objeto vazio.

    // Remover categorias que acabaram ficando vazias (embora improvável com a lógica acima, a menos que allBoards estivesse vazio)
    Object.keys(categorized).forEach(key => {
      if (categorized[key].length === 0) {
        delete categorized[key];
      }
    });

    // Enviar a resposta com os boards categorizados
    res.status(200).json(categorized);

  } catch (error) {
    // Logar o erro no servidor para debugging
    console.error("Erro ao buscar boards categorizados:", error);
    res.status(500).json({ message: 'Erro ao buscar boards categorizados', error: error.message });
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










