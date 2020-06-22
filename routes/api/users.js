const express = require("express");
const router = express.Router();
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    console.log(req.body);
    res.send("User Routes");
  }
);

module.exports = router;
