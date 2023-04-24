const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/protect')
const {createPost,getPosts,getPost,deletePost,editPost} = require('../controllers/post')

router.route('/').get(getPosts)
router.route('/:id').get(getPost).delete(deletePost).put(editPost);
router.route('/').post( protect, createPost);


module.exports = router