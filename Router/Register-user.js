const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const { default: JWT_Generator } = require('../Utils/JWT-Generator');
const JWt_Verifier = require('../MIddlewares/JWt-Verifier');


router.post('/V1/User-Register', JWt_Verifier, async (req, res, next) => {
 const { Phone } = req.body;

 if (!Phone) {
  return res.status(400).json({ message: "Send phone number" });
 }

 const filePath = path.join(__dirname, '../DATA/Users.json');

 try {
  // *Read existing users
  const fileData = await fs.readFile(filePath, 'utf8');
  const users = JSON.parse(fileData);



  // *Check for duplicate
  const existingUser = users.find(u => u.phone === Phone);
  if (existingUser) {
   return res.status(409).json({ message: "User already registered" });
  }

  //*Add new user
  const newUser = { id: crypto.randomUUID(), phone: Phone };
  users.push(newUser);

  // *Write updated array back to file
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');
  await JWT_Generator(newUser)
  next()
  return res.status(201).json({ message: "User registered successfully", user: newUser });

 } catch (err) {
  //* Handle file not found separately
  if (err.code === 'ENOENT') {
   return res.status(404).json({ message: "Users file not found" });
  }

  return res.status(500).json({ message: "Server error", error: err.message });
 }
});

module.exports = router;
