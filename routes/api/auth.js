const express = require("express");
const router = express.Router();

//@route    GET api/auth
//@desc     Test Route
//@access   PUBLIC
router.get("/", (req, res) => {
  res.send("Auth Route");
});

module.exports = router;
