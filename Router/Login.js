const express = require('express').Router();
const path = require('path');
const fs = require('fs').promises;
router.get('/V1/login', async (req, res) => {
 try {
  const { phone, password } = req.body;
  // *initialize file path
  const filePath = path.join(__dirname, '../DATA/Users.json');
  // * read file
  const User = await fs.readFile(filePath, 'utf8')

  res.send(Logins)
 } catch (error) {
  res.status(500).send(error.message)
 }
})