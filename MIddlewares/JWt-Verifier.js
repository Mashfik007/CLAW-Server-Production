const jwt = require('jsonwebtoken');

function JWt_Verifier(req, res, next) {
 const authHeader = req.headers.authorization;
 if (!authHeader) {
  return res.status(401).json({ message: 'No Authorization Header' });
 }

 const token = authHeader.split(' ')[1]; // split on space
 if (!token) return res.status(401).json({ message: 'Invalid Token Format' });

 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_Key);
  req.user = decoded;
  next();
 } catch (error) {
  if (error.name === 'TokenExpiredError') {
   return res.status(401).json({ message: 'Session Expired', error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
   return res.status(401).json({ message: 'Invalid Token', error: error.message });
  }
  return res.status(500).json({ message: 'Internal Server Error', error: error.message });
 }
}

module.exports = JWt_Verifier;
