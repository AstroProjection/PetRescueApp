const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// image upload
const upload = require('../services/imageUploader');

/// authentication middleware
const auth = require('../auth/auth');

const { check, validationResult } = require('express-validator');
/// model
const Post = require('../model/Post');
const User = require('../model/User');

//   @route POST api/post
//   @desc Create a post on the bulletin
//   @access private
router.post(
  '/',
  [
    auth,
    upload.array('image', 1),
    check('text', 'text is required').notEmpty(),
    check('title', 'title is required').notEmpty(),
  ],
  async (req, res) => {
    ///checking that text/name,email is not empty
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req.body);
    let locationState = JSON.parse(req.body.locationState);
    try {
      const newPost = new Post({
        text: req.body.text,
        title: req.body.title,
        user: req.user.id,
        image: req.files.length > 0 ? req.files[0].filename : null,
        tag: req.body.tag,
        urgency: req.body.urgency,
        status: req.body.status,
        locationState: locationState,
      });

      newPost.save(async (err, post) => {
        /// get populated user post for posts array
        if (err) throw err;
        const nPost = await Post.findById(post.id).populate({
          path: 'user',
          select: 'name _id',
        });
        // console.log(nPost);
        res.json(nPost);
      });

      // res.json(newPost);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }
);

//   @route POST api/post/:postId
//   @desc Edit a post on the bulletin
//   @access private

// above are just descriptions of the route.

router.put(
  '/:postId',
  [
    auth,
    upload.array('image', 1),
    check('text', 'text is required').notEmpty(),
    check('title', 'title is required').notEmpty(),
  ],
  async (req, res) => {
    ///checking that text/name,email is not empty
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req.body);
    // console.log(req.files[0]);
    let locationState = JSON.parse(req.body.locationState);
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        {
          text: req.body.text,
          title: req.body.title,
          image: req.files.length > 0 ? req.files[0].filename : req.body.image,
          tag: req.body.tag,
          urgency: req.body.urgency,
          status: req.body.status,
          locationState,
        },
        {
          new: true,
        }
      ).populate({ path: 'user', select: 'name _id' });

      res.json({ post, id: req.params.postId });
    } catch (error) {
      // console.log(error);
      return res.status(400).json({ error });
    }
  }
);

//   @route POST api/post/upload/:postId
//   @desc Upload picture to post on the bulletin
//   @access private

// above are just descriptions of the route.

router.post(
  '/upload/:postId',
  [auth, upload.array('image', 1)],
  async (req, res) => {
    try {
      //getting post
      const post = await Post.findById(req.params.postId).populate({
        path: 'user',
        select: 'name _id',
      });
      // remove old image from img path
      if (post.image) {
        const oldPath = post.image;
        fs.unlink(oldPath, (err) => {
          if (err) {
            throw err;
          } else {
            // console.log('removed old image');
          }
        });
      }
      /// saving new image to img path
      post.image = req.files[0].filename;
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

//   @route GET api/post
//   @desc get all the bulletin posts
//   @access public

// above are just descriptions of the route.

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate({
        path: 'user',
        select: 'name _id',
      })
      .sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(400).json(error.errors);
  }
});

//   @route GET api/post/:post_id
//   @desc Get post by id
//   @access public

router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate({
      path: 'user',
      select: '-password -email',
      populate: { path: 'locality', select: 'locality locality_unique' },
    });

    if (!post) return res.status(404).json({ msg: 'Post not found!' });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.errors);
  }
});

//   @route POST api/post/comments/:post_id
//   @desc Create a comment for post of id
//   @access private

router.put(
  '/comments/:postId',
  [auth, check('text', 'text is required').notEmpty()],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.postId);

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
      };
      // console.log(newComment);
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      // console.log(error);
      res.status(400).json(error.errors);
    }
  }
);

//   @route DEL api/post/comments/:postId/:commentId
//   @desc delete a comment[commentId] on post[postId]
//   @access private

router.delete('/comments/:postId/:commentId', auth, async (req, res) => {
  try {
    // console.log();
    const post = await Post.findById(req.params.postId);
    const comment = post.comments.find((comment) => {
      return comment.id === req.params.commentId;
    });

    //comment exist?
    if (!comment)
      return res.status(404).json({ msg: 'Comment does not exist' });
    //comment creator is not loggedin user?
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    // remove the comment from the backend
    const removeIndex = post.comments
      .map((comment) => {
        return comment.id.toString();
      })
      .indexOf(req.params.commentId);
    post.comments.splice(removeIndex, 1);
    // save in the backend
    await post.save();
    res.status(200).json({ msg: 'Comment Removed!' });
  } catch (error) {
    // console.log(error);
    res.status(500).json('Server error');
  }
});

//   @route DEL api/post/:post_id
//   @desc Get post by id
//   @access private

router.delete('/:postId', auth, async (req, res) => {
  // console.log('deleting');
  try {
    const post = await Post.findById(req.params.postId);
    // console.log(post);
    if (!post) return res.status(404).json({ msg: 'post not found' });

    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    // console.log('pre-deleted');
    await post.remove();
    // console.log('deleted');

    res.json({ msg: 'post removed' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error, id: req.params.postId });
  }
});

module.exports = router;
