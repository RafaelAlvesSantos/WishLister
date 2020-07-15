const jwt = require("jsonwebtoken");
const config = require("config");

const authMid = (req, res, next) => {
  //Get token from Header and check it
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(400).send("Could not validate token. Access Denied.");

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).send("Token could not be validated");
  }
};

module.exports = authMid;
