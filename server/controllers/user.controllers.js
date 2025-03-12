import User from '../models/user.models.js';
import bcrypt from 'bcrypt';

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
      name: req.body.name
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