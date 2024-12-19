import User from '../models/user.models.js';

export async function postUser(req, res) {
  try {
    // Check if user already exists:
    const userExists = await User.findOne({ email: req.body.email });
    if(userExists) {
      return res.status(422).send({ message: "Email already in use" });
    }

    // Saving user data:
    const newUser = new User({
      email: req.body.email,
      name: req.body.name
    });

    await newUser.save();

    res.status(201);
    res.send({ message: "User succesfully registered" });
  } catch(error) {
    res.status(500);
    res.send(error.message);
  }
};