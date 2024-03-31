const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const generateTokenAndSetCookie = async (userId, res) => {
    // console.log("req: " ,req , "res : ", res)
  const Token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15d" });

  res.cookie("jwt", Token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

module.exports = generateTokenAndSetCookie;
