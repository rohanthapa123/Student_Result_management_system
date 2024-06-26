const jwt  = require("jsonwebtoken");

const generateRefreshToken = ({user_id , role}) => {
  return jwt.sign({user_id : user_id , role : role}, process.env.JWTSECRET, {
    expiresIn: "5m",
  });
};

module.exports = {generateRefreshToken}