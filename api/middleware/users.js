import { createUserSchema, modifyUserSchema } from "../schemas/users.js";
import { verifyToken } from "../services/users.js";

function validateCreateUser(req, res, next){
	createUserSchema.validate(req.body, {
		stripUnknown: true
	})
	.then((data) =>{
		req.body = data
        next()
	})
	.catch(e => res.status(400).json(e))
}

function validateModifyUser(req, res, next){
	modifyUserSchema.validate(req.body, {
		stripUnknown: true
	})
	.then((data) =>{
		req.body = data
        next()
	})
	.catch(e => res.status(400).json(e))
}

function validateAccess(req, res, next){
	const token = req.headers['auth-token']
	if(!token){
		return res.status(400).json({'error': 'no se encuentra el token de acceso'})
	}
	verifyToken(token)
	.then((payload) => {
		req.payload = payload
		req.token = token
		next()
	})
	.catch((err) => res.status(401).json({'error': 'token inválido'}))
}

function checkAdminRole(req, res, next){
	if(req.payload.role === "admin"){
		next()
	}else{
		res.status(403).json({'error': 'la operación requiere privilegios'})
	}
}

function preventEscalation(req, res, next){
	if(req.body.role){
		if(req.payload.role === "admin"){
			next()
		}else{
			return res.status(403).json({'error': 'la operación requiere privilegios'})
		}
	}else{
		next()
	}
}

export {
    validateCreateUser,
	validateModifyUser,
	validateAccess,
	checkAdminRole,
	preventEscalation
}