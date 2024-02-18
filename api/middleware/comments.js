import { pushCommentSchema } from "../schemas/comments.js";

function validatePushComment(req, res, next){
	pushCommentSchema.validate(req.body, {
		stripUnknown: true
	})
	.then((data) =>{
		req.body = data
        next()
	})
	.catch(e => res.status(400).json(e))
}

export {
    validatePushComment
}