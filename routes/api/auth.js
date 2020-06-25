const express = require("express");
const router = express.Router();
const User = require("../../model/User");
const auth = require("../../middleware/auth");
//@route    GET api/auth
//@desc     Test Route
//@access   PUBLIC
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
});

module.exports = router;
