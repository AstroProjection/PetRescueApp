const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
/// model
const Post = require('../model/Post');
const random = require('../auth/auth');

//   @route POST api/post
//   @desc creating a post on the bulletin
//   @access public

// above are just descriptions of the route.

router.post(
  '/',
  [
    random,
    check('text', 'text is required').notEmpty(),
    check('email', 'email is required!').isEmail().notEmpty(),
    check('name', 'name is required').notEmpty(),
    check('title', 'title is required').notEmpty(),
  ],
  async (req, res) => {
    ///checking that text/name,email is not empty
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const newPost = new Post({
        text: req.body.text,
        title: req.body.title,
        name: req.body.name,
        email: req.body.email,
      });

      await newPost.save();

      res.json(newPost);
    } catch (error) {
      res.status(400).json(error.errors);
    }
  }
);

//   @route GET api/post
//   @desc fetching all the bulletin posts
//   @access public

// above are just descriptions of the route.

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('post', ['name', 'title', 'text']);
    res.json(posts);
  } catch (error) {
    res.status(400).json(error.errors);
  }
});

//   @route GET api/posts/:post_id
//   @desc Get post by id
//   @access public

router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ msg: 'post not found!' });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.errors);
  }
});

//   @route GET api/posts/:post_id
//   @desc Get post by id
//   @access public

router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ msg: 'post not found!' });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.errors);
  }
});
//   @route POST api/posts/comments/:post_id
//   @desc Create a comment for post of id
//   @access public

router.post(
  '/comments/:postId',
  [random, check('text', 'text is required').notEmpty()],
  async (req, res) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const user = User.findById(req.user.id).select('-password');
      const post = Post.findById(req.params.postId);

      const newComment = {
        name: user.name,
        text: req.body.text,
        user: req.user._id,
      };

      post.comments.unshift(newComment);
      await post.save();
    } catch (error) {
      console.error(error);
      res.status(400).json(error.errors);
    }
  }
);

//   @route DEL api/posts/:post_id
//   @desc Get post by id
//   @access private

router.delete('/:postId', random, async (req, res) => {
  try {
    const post = Post.findById({ _id: req.params.postId });
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    await post.remove();
  } catch (error) {
    console.error(error);
    res.status(400).json(error.errors);
  }
});

module.exports = router;
