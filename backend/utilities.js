const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);
  try {
      const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

      req.user = decoded
        next();
      
    }
    catch (err) {
      console.log(err);
      res.status(401).json({ error: "Invalid Token" })
    }
  
}


const generateToken = (userData) => {
  return jwt.sign(userData, process.env, ACCESS_TOKEN_SECRET);
}


module.exports = {
  authenticateToken

};