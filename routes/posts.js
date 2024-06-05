// server/routes/posts/js

import express from 'express'
import { getPosts, createPost, updatePost,deletePost, likePost } from '../controllers/posts.js'
const router = express.Router()

// console.log(getPosts)

router.get('/',getPosts);       // to fetch posts from db
router.post('/',createPost);       // creates post in db
router.patch('/:id',updatePost)     // updates post in db
router.delete('/:id',deletePost)     // deletes post from db
router.patch('/:id/likePost', likePost);


export default router;