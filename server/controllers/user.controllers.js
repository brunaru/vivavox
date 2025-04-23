import User from '../models/user.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function postUser(req, res) {
  try {
    // Confirm password validation:
    if(req.body.password !== req.body.confirmedPassword) {
      return res.status(422).json({ message: "Passwords do not match" });
    }

    // Check if user already exists:
    const userExists = await User.findOne({ email: req.body.email });
    if(userExists) {
      return res.status(422).send({ message: "Email already in use" });
    }

    // Password creation:
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    // Saving user data:
    const newUser = new User({
      email: req.body.email,
      password: passwordHash,
      name: req.body.name,
      type: req.body.type,
      currentBoard: req.body.currentBoard
    });

    await newUser.save();

    res.status(201);
    res.send({ message: "User succesfully registered" });
  } catch(error) {
    if(error.name === 'ValidationError') {
      // Build a specific error message for each invalid field:
      const messages = Object.values(error.errors).map(err => err.message);

      res.status(400).send({ message: "Validation error:", errors: messages });
    } else {
      res.status(409);
      res.send(error.message);
    }
  }
};

export async function loginUser(req, res) {
  try {
    // Check if user exists:
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
      return res.status(404).send({ message: "Email ou senha incorretos" });
    }
  
    // Check password:
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if(!checkPassword) {
      return(res.status(422).json({ message: "Email ou senha incorretos" }));
    }

    const secret = process.env.SECRET;

    // Token creation:
    const token = jwt.sign({
      _id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
      currentBoard: user.currentBoard
    }, secret);

    // Response:
    res.status(200).json({ message: "Succesfully authenticated", token: token });
    console.log("Login realizado");
  } catch(error) {
    if(error.name === 'ValidationError') {
      // Build a specific error message for each invalid field:
      const messages = Object.values(error.errors).map(err => err.message);

      res.status(400).send({ message: "Validation error:", errors: messages });
    } else {
      res.status(409);
      res.send(error.message);
    }
  }
};


export async function updateUser(req, res) {
  const { id } = req.params; // Pega o ID da URL
  const updateData = req.body; // Pega os dados do corpo da requisição

  try {
    // 1. Encontrar o usuário pelo ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // --- PONTO CRÍTICO DE SEGURANÇA ---
    // TODO: Adicionar lógica de autorização aqui!
    // Ex: Verificar se o req.user (do token JWT) tem o mesmo ID
    // ou se req.user tem permissão de admin.
    // Exemplo básico (NÃO USAR EM PRODUÇÃO SEM AUTORIZAÇÃO REAL):
    // if (req.user._id !== id && req.user.role !== 'admin') {
    //   return res.status(403).json({ message: "Forbidden: You cannot update this user." });
    // }
    // -----------------------------------

    // 2. Lidar com atualização de senha (se fornecida)
    if (updateData.password) {
      if (!updateData.confirmedPassword) {
        return res.status(422).json({ message: "Password confirmation is required for update" });
      }
      if (updateData.password !== updateData.confirmedPassword) {
        return res.status(422).json({ message: "Passwords do not match for update" });
      }
      // Gerar hash da nova senha
      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(updateData.password, salt);
    }

    // 3. Lidar com atualização de email (se fornecido e diferente)
    if (updateData.email && updateData.email !== user.email) {
      // Verificar se o novo email já está em uso por OUTRO usuário
      const emailExists = await User.findOne({ email: updateData.email, _id: { $ne: user._id } });
      if (emailExists) {
        return res.status(422).json({ message: "New email address is already in use" });
      }
      user.email = updateData.email;
    }

    // 4. Atualizar outros campos permitidos (se fornecidos)
    if (typeof updateData.name !== 'undefined') user.name = updateData.name;
    // CUIDADO: Atualizar 'type' pode ter implicações de segurança/permissão
    if (typeof updateData.type !== 'undefined') user.type = updateData.type;
    if (typeof updateData.currentBoard !== 'undefined') user.currentBoard = updateData.currentBoard;
    // Adicione outros campos aqui se necessário

    // 5. Salvar o usuário atualizado
    // O .save() também dispara validações do Mongoose
    const updatedUser = await user.save();

    // 6. Preparar a resposta (excluindo a senha)
    const userResponse = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      type: updatedUser.type,
      currentBoard: updatedUser.currentBoard,
      // Inclua outros campos conforme necessário, mas NÃO a senha
    };

    const secret = process.env.SECRET; // Pega o segredo JWT do ambiente
    if (!secret) {
        console.error("JWT Secret not found in environment variables!");
        // Decide como lidar: talvez retornar um erro 500 ou apenas logar e continuar sem token
        return res.status(500).json({ message: "Internal server configuration error." });
    }

    const newTokenPayload = { // Crie o payload com os dados atualizados
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      type: updatedUser.type,
      currentBoard: updatedUser.currentBoard // Garante que o valor atualizado está no token
    };

    // Gere o novo token
    const newToken = jwt.sign(
        newTokenPayload,
        secret,
        { expiresIn: '7d' } // Define um tempo de expiração (opcional, mas recomendado) - ajuste conforme necessário
    );

    res.status(200).json({
      message: "User updated successfully",
      token: newToken      // Adiciona o novo token à resposta
    });
  } catch (error) {
    // Lidar com erros de validação do Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Validation error during update:", errors: messages });
    }
    // Lidar com erro de ID inválido (formato incorreto)
    if (error.name === 'CastError' && error.path === '_id') {
        return res.status(400).json({ message: "Invalid user ID format" });
    }
    // Outros erros inesperados
    console.error("Error updating user:", error); // Logar o erro no servidor
    res.status(500).json({ message: "An internal server error occurred while updating the user." });
  }
};