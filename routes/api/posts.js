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
      res.json(post);
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

//@route PUT api/posts/like/:post_id
//@desc like a post
//@access private
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //if post has already been liked???
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
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

//@route PUT api/posts/unlike/:post_id
//@desc unlike a post
//@access private
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "You haven't liked this post yet" });
    }
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
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

//@route    POST api/posts/comment/:post_id
//@desc     Comment on post
//@access   private
router.post(
  "/comment/:post_id",
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
      const post = await Post.findById(req.params.post_id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route api/posts/comment/:post_id/:comment_id
//@desc Delete comment from a post
//@access private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    const comment = post.comments.find(
      (comment) => comment.id.toString() === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({
        msg: "Comment not found",
      });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(400).json({
        msg: "User not authorized",
      });
    }

    const removeIndex = post.comments
      .map((comment) => comment.id.toString())
      .indexOf(req.params.comment_id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        msg: "Comment not found",
      });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
