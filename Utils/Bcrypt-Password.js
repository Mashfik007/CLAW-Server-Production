const bcrypt = require('bcrypt');

const bcrypt_password = async (password) => {
 try {
  const salt = bcrypt.genSalt(10);
  const hashPass = bcrypt.hash(password, salt)

  return hashPass

 } catch (error) {
  console.log(error)
 }

}

module.exports = bcrypt_password