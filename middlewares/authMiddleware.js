const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  //   console.log(req.headers);
  if (!token) {
    return res.status(401).json({ message: "Token not found!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await UserModel.findById(decoded?.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Session expired! Pls login again." });
  }
};

module.exports = authMiddleware;
