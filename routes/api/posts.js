const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../../middleware/auth");
const Post = require("../../model/Post");
const User = require("../../model/User");
const Profile = require("../../model/Profile");
//@route    POST api/posts
//@desc     Post Route
//@access   private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const erorrs = validationResult(req);
    if (!erorrs.isEmpty()) {
      return res.status(400).json({
        erorrs: erorrs.array(),
      });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      const post = new Post(newPost);
      await post.save();
      res.send(post);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    GET api/posts
//@desc     Get all posts
//@access   private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/posts/:post_id
//@desc     Get post by id
//@access   private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({
        msg: "Post not found",
      });
    }
    res.json(post);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        msg: "Post not found",
      });
    }
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/posts/:post_id
//@desc     delete post by id
//@access   private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({
        msg: "Post not found",
      });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: "User not authorized",
      });
    }
    await post.remove();
    res.json({
      msg: "Post removed",
    });
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        msg: "Post not found",
      });
    }
    res.status(500).send("Server Error");
  }
});
module.exports = router;
