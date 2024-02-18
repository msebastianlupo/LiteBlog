import { createPasswordSchema } from '../schemas/passwords.js'

function validateCreatePassword(req, res, next){
    createPasswordSchema.validate(req.body, {
		stripUnknown: true
	})
	.then((data) =>{
		req.body = data
        next()
	})
	.catch(e => res.status(400).json(e))
}

export {
    validateCreatePassword
}