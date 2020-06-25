const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  //check if token exists
  if (!token) {
    return res.status(401).json({ msg: "No Token, authorization denied" });
  }

  //verifying token
  try {
    const decoded = await jwt.verify(token, config.get("jwtToken"));
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token invalid",
    });
  }
};
