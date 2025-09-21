const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');
const { default: JWT_Generator } = require('../Utils/JWT-Generator');
const JWt_Verifier = require('../MIddlewares/JWt-Verifier');
const User = require('../SCHEMA/User-schema');
const { token } = require('morgan');

router.post('/V1/User-Register', JWt_Verifier, async (req, res) => {
 const { phone, password } = req.body.User

 if (!phone || phone.length < 14 || phone.length > 15) {

  throw new Error(`${phone.length}`,);
 }

 const filePath = path.join(__dirname, '../DATA/Users.json');

 try {
  // * Read existing users
  let users = [];
  const fileData = await fs.readFile(filePath, 'utf8');
  users = JSON.parse(fileData);

  // * Check for duplicate
  const existingUser = users.find(u => u.User.phone === phone);
  if (existingUser) {
   return res.status(409).json({ message: "User already registered" });
  }

  // * Create new User object with hashed password
  const newUser = await User.create(req.body);

  users.push(newUser);

  // * Write updated array back to file
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');

  // * Generate JWT
  const jwtToken = await JWT_Generator(newUser._id);

  // * Send cookie + response
  return res
   .cookie("token", jwtToken, { httpOnly: true, secure: false, maxAge: 60 * 60 * 1000 }).status(201)
   .json({ message: `User registered successfully `, ...newUser });

 } catch (err) {
  console.error(err);
  return res.status(500).json({ message: "Server error", error: err.message });
 }
});

module.exports = router;
