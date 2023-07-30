const jwt = require('jsonwebtoken')

const authorise = (req, res, next) => {
 
    const token = req.header('Authorization');
    // console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      //   console.log(decoded);
      // console.log("in authorise")
      next(); // Continue with next middleware
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };




  


module.exports = {authorise};

