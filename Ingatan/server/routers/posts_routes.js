const express = require('express');
const router = express.Router();

// connect to post controllers
const { Greeting, GetAllPosts, GetSinglePost, GetPostsBySearch, CreatePost, CreateComment, UpdatePost, LikedPost, DeletePost } = require('../controllers/posts_controllers');
// connect to auth middleware
const auth_middleware = require('../utilities/auth_middleware');

router.route('/').get(Greeting);
router.route('/posts').get(GetAllPosts);
router.route('/post/:id').get(GetSinglePost);
router.route('/posts/search').get(GetPostsBySearch);

router.route('/post').post(auth_middleware, CreatePost);
router.route('/post/comment/:id').post(auth_middleware, CreateComment);

router.route('/post/update/:id').put(auth_middleware, UpdatePost);
router.route('/post/like/:id').put(auth_middleware, LikedPost);

router.route('/post/delete/:id').delete(auth_middleware, DeletePost);

module.exports = router;