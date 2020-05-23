const express = require('express');
const router = express.Router();
const fs = require('fs');

/// multer [ for images] enctype="multipart/form-data"
const multer = require('multer');

const fileFilter = (req, file, callback) => {
  /// cb(null,false) rejects file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/');
  },
  filename: (req, file, callback) => {
    callback(
      null,
      `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 15 },
  fileFilter: fileFilter,
});

const { check, validationResult } = require('express-validator');
/// model
const Post = require('../model/Post');
const User = require('../model/User');
const auth = require('../auth/auth');

//   @route POST api/post
//   @desc Create a post on the bulletin
//   @access private

// above are just descriptions of the route.

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

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newPost = new Post({
        text: req.body.text,
        title: req.body.title,
        user: req.user.id,
        image: req.files.length > 0 ? req.files[0].path : null,
      });

      newPost.save(async (err, post) => {
        /// get populated user post for posts array
        const nPost = await Post.findById(post.id).populate({
          path: 'user',
          select: 'name _id',
        });
        res.json(nPost);
      });

      // res.json(newPost);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
);

//   @route POST api/post
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
            console.log('removed old image');
          }
        });
      }

      /// saving new image to img path
      post.image = await req.files[0].path;

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
    const posts = await Post.find()
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
    const post = await Post.findById(req.params.postId);
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

router.post(
  '/comments/:postId',
  [auth, check('text', 'text is required').notEmpty()],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.postId);

      const newComment = {
        user: req.user.id,
        name: user.name,
        text: req.body.text,
      };
      post.comment.push(newComment);
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(400).json(error.errors);
    }
  }
);

//   @route DEL api/post/comment/:postIdd/:commentId
//   @desc delete a comment[commentId] on post[postId]
//   @access private

router.delete('/comment/:postId/:commentId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const comment = post.comment.find((comment) => {
      return comment.id === req.params.commentId;
    });

    //comment exist?
    if (!comment)
      return res.status(404).json({ msg: 'Comment does not exist' });
    //comment creator is not loggedin user?
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    // remove the comment from the backend
    const removeIndex = await post.comment.map((comment) => {
      return comment.id.toString().indexOf(req.params.commentId);
    });
    await post.comment.splice(removeIndex, 1);
    // save in the backend
    await post.save();
    res.json({ msg: 'comment removed', post: await post });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
});

//   @route DEL api/post/:post_id
//   @desc Get post by id
//   @access private

router.delete('/:postId', auth, async (req, res) => {
  console.log('deleting');
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ msg: 'post not found' });

    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    await post.remove();

    res.json({ msg: 'post removed' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'post not found' });
  }
});

module.exports = router;
