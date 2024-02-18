import { modifyPasswordSchema } from '../schemas/resets.js'

function validateModifyPassword(req, res, next){
	modifyPasswordSchema.validate(req.body, {
		stripUnknown: true
	})
	.then((data) =>{
		req.body = data
        next()
	})
	.catch(e => res.status(400).json(e))
}

export {
    validateModifyPassword
}