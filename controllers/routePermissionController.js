const jwt = require('jsonwebtoken');
 // Adjust path as per your project structure
 const dotenv = require("dotenv");
dotenv.config();

exports.isAuthenticated = (req, res) => {
  try {
    // Check if authorization header is present
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // Remove 'Bearer ' from token string
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWTSECRET);
      } catch (error) {
        return res.status(401).json({ authenticated: false, message: 'Invalid or expired token' });
      }

      // Token is valid, user is authenticated
      res.status(200).json({
        authenticated: true,
        message: 'Authenticated',
        role: decoded.role, // Assuming role is stored in the token payload
      });
    } else {
      res.status(401).json({
        authenticated: false,
        message: 'Unauthorized',
      });
    }
  } catch (error) {
    console.error('Error in isAuthenticated controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
