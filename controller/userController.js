const User = require("../models/user.model");

const getUsersList = async (req, res) => {
  try {
    const loggedInUsersId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUsersId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error in get user", error);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = { getUsersList };
