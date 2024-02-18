import express from 'express'
import { createPostCtrl, findPostCtrl, getPostsCtrl, modifyPostCtrl, deletePostCtrl, getUserPostsCtrl, findUserPostCtrl } from '../controllers/posts.js'
import { sameAuthor, validateCreatePost, validateModifyPost } from '../middleware/posts.js'
import { validateAccess } from '../middleware/users.js'

const postsRoutes = express.Router()

postsRoutes.route('/posts')
.get(getPostsCtrl)

postsRoutes.route('/posts/:postId')
.get(findPostCtrl)

postsRoutes.route('/users/:userId/posts')
.get(getUserPostsCtrl)
.post([validateAccess, validateCreatePost], createPostCtrl)

postsRoutes.route('/users/:userId/posts/:postId')
.get(findUserPostCtrl)
.patch([validateAccess, validateModifyPost, sameAuthor], modifyPostCtrl)
.delete([validateAccess, sameAuthor], deletePostCtrl)

export {
    postsRoutes
}