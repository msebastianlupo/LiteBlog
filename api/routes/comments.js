import express from 'express'
import { pushCommentCtrl, getCommentsCtrl } from '../controllers/comments.js'
import { validatePushComment } from '../middleware/comments.js' 

const commentsRoutes = express.Router()

commentsRoutes.route('/posts/:postId/comments')
.get(getCommentsCtrl)
.post([validatePushComment], pushCommentCtrl)

export {
    commentsRoutes
}