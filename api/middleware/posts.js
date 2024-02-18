import { createPostSchema, modifyPostSchema } from "../schemas/posts.js"
import { findUserPost } from "../services/posts.js"

function validateCreatePost(req, res, next){
	createPostSchema.validate(req.body, {
		stripUnknown: true
	})
	.then((data) =>{
		req.body = data
        next()
	})
	.catch(e => res.status(400).json(e))
}

function validateModifyPost(req, res, next){
	modifyPostSchema.validate(req.body, {
		stripUnknown: true
	})
	.then((data) =>{
		req.body = data
        next()
	})
	.catch(e => res.status(400).json(e))
}

function sameAuthor(req, res, next){
	const {postId} = req.params
	findUserPost(req.payload._id, postId)
	.then(post => next())
	.catch(e => res.status(404).json({'error': 'el post no existe'}))
}

export {
    validateCreatePost,
	validateModifyPost,
	sameAuthor
}