const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    
    const user = await User.findOne({ userName });
    // console.log(user, req.body)
    if (!user) {
          return res.status(400).json({ error:"something went wrong", message: "Invalid user name " });
        }
    const passwordCompare = await bcrypt.compare(password, user.password)

    if (!user || !passwordCompare) {
      return res.status(400).json({error:"something went wrong",  message: "invalid user name or password" });
    }
    const token = generateToken(user._id, res);
    return res.status(200).json({
      _id:user._id,
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      token:token
    });
  } catch (error) {
    console.log("error in login controller ", error);

    return res.status(500).json({ message: "internal server error" });
  }


};
const signUp = async (req, res) => {
  try {
    const {
      userName,
      fullName,
      password,
      confirmPassword,
      gender,
      email,
    } = req.body;
    console.log(req.body)

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password don't match" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.status(201).json({ error: "Duplicate user" });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      fullName,
      password: hashedPassword,
      profilePic:gender === "male"? boyProfilePic:girlProfilePic,
      gender,
      email,
    });

    const data = await newUser.save();
    const Token = await generateToken(newUser._id, res);
    res.status(200).json({
      _id: data._id,
      fullName: data.fullName,
      userName: data.userName,
      email: data.email,
      profilePic: data.profilePic,
      gender: data.gender,
      Token: Token,
    });
  } catch (error) {
    res.send("error in signup:");
    console.log("error in signup:", error);
  }
};

const logOut = (req, res) => {
  try {
    res.json("jwt", " ", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    res.send("error in logout:");
    console.log("error in logout:", error);
  }
};

module.exports = { login, signUp, logOut };
