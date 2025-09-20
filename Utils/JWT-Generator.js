import jwt from 'jsonwebtoken';
export default async function JWT_Generator(User) {
 try {
  const token = jwt.sign(User, process.env.JWT_SECRET_Key, { expiresIn: '1h' })
  console.log(token)
  return token
 } catch (error) {
  console.log(error)
 }
};
