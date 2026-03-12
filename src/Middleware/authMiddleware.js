const JWT = require("jsonwebtoken");
const User = require("../models/userModel.js");

const protected = async (req, res, next) => {
  try {
    let token;

    // Get the Authorization header
    const authHeader = req.headers.authorization;

    // Check if header exists and starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer")) {
      // Extract token
      token = authHeader.split(" ")[1];

      // Verify token
      const decoded = JWT.verify(token, process.env.JWT_SECRET);

      // Find user in DB, exclude password
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Attach user to request
      req.user = user;

      // Continue to controller
      next();
    } else {
      // No token provided
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    // Token invalid or expired
    return res.status(401).json({ message: "Token failed" });
  }
};

module.exports = protected;