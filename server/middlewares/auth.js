// middleware/auth.js

const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  // Get the token from the headers
  const token = req.header('Authorization')?.split(' ')[1];

  // If no token is found, return an error
  if (!token) {
    return res.status(401).json({ success : falase  ,  message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user information to the request
    req.user = decoded;
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = isAuthenticated;
