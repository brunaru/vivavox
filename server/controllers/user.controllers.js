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
      type: req.body.type
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
      return res.status(404).send({ message: "Incorrect email" });
    }
  
    // Check password:
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if(!checkPassword) {
      return(res.status(422).json({ mesage: "Incorrect password" }));
    }

    const secret = process.env.SECRET;

    // Token creation:
    const token = jwt.sign({
      _id: user._id,
      name: user.name
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