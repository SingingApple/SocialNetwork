const express = require("express");
const router = express.Router();
const User = require("../../model/User");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
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

//@route    POST api/auth
//@desc     Authenticate and get Token
//@access   PUBLIC
router.post(
  "/",
  [
    check("email", "Please use valid email").isEmail(),
    check(
      "password",
      "Please enter password with more than 6 characters"
    ).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // see if a user exists
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }],
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }],
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      //JSONwebToken
      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
