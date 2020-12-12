const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts') ;

router.get('/', postCtrl.getPosts);
router.post('/', postCtrl.createPost);
router.get('/:id', postCtrl.getPost);
router.patch('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);
router.patch('/:id/likePost', postCtrl.likePost);

module.exports = router;