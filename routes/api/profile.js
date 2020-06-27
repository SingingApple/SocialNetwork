const express = require("express");
const router = express.Router();
const User = require("../../model/User");
const auth = require("../../middleware/auth");
const Profile = require("../../model/Profile");
const { check, validationResult } = require("express-validator");

//@route    GET api/profile/me
//@desc     Get current user's profile
//@access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({
        msg: "There is no profile for this user",
      });
    }
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//@route POST api/profile
//@desc Create or Update User Profile
//@access Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //Build Profile Objest
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) {
      profileFields.company = company;
    }
    if (website) {
      profileFields.website = website;
    }
    if (location) {
      profileFields.location = location;
    }
    if (bio) {
      profileFields.bio = bio;
    }
    if (status) {
      profileFields.status = status;
    }
    if (githubusername) {
      profileFields.githubusername = githubusername;
    }
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    profileFields.social = {};
    if (youtube) {
      profileFields.social.youtube = youtube;
    }
    if (instagram) {
      profileFields.social.instagram = instagram;
    }
    if (facebook) {
      profileFields.social.facebook = facebook;
    }
    if (twitter) {
      profileFields.social.twitter = twitter;
    }
    if (linkedin) {
      profileFields.social.linkedin = linkedin;
    }
    console.log(profileFields);

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      //Update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/profile
//@desc Get all profiles
//@access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@route Get api/profile/user/:user_id
//@desc get profile by user_id
//@access public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.find({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      res.status(400).json({ msg: "No profile exists for this user" });
    }
    res.json(profile);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(400).json({ msg: "No profile exists for this user" });
    }
    console.log(error.message);
    res.send("Server Error");
  }
});

//@route DELETE api/profile/
//@desc delete profile, user and post
//@access private
router.delete("/", auth, async (req, res) => {
  try {
    //@todo remove users post
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User removed" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Server Error");
  }
});

module.exports = router;
