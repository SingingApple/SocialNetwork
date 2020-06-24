const express = require("express");
const router = express.Router();
const User = require("../../model/User");
const gravatar = require("gravatar");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
//@route    POST api/users
//@desc     Register User
//@access   PUBLIC
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please use valid email").isEmail(),
    check(
      "password",
      "Please enter password with more than 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // see if a user exists
    const { email, name, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({
          errors: [{ msg: "User already exists" }],
        });
      }
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg", // PG rated content
        d: "mm", // Default
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });
      //GEN SALT and password hashing
      const salt = await bcyrpt.genSalt(10);

      user.password = await bcyrpt.hash(password, salt);
      //Saving
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
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
