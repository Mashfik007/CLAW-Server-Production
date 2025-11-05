const router = require('express').Router()
const upload = require("../MIddlewares/File-Upload-Multer")

router.post('/image', upload.array('image', 2), async (req, res) => {
 try {
  res.send("image uploaded")
 } catch (error) {
  res.status(500).send(error.message)
 }
})


module.exports = router