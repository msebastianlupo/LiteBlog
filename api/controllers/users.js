import { getUsers, findUser, createUser, modifyUser, deleteUser, loginUser, logOutUser } from '../services/users.js'


function getUsersCtrl(req, res){
	getUsers(req.query)
	.then(users => res.status(200).json(users))
	.catch(e => res.status(500).json({'error': 'se produjo un error interno'}))
}

function createUserCtrl(req, res){
	createUser(req.body)
	.then((user) => res.status(201).json(user))
	.catch(err => {
		if(err === 400){
			res.status(400).json({'error': 'el usuario ya existe'})
		}else{
			res.status(500).json({'error': 'se produjo un error interno'})
		}
	})
}

function findUserCtrl(req, res){
    const { userId } = req.params
    findUser(userId)
	.then(user => res.status(200).json(user))
	.catch(e => res.status(404).json({'error': 'no se encontró el usuario'}))
}

function modifyUserCtrl(req, res){
	const { userId } = req.params
	modifyUser(userId, req.body)
	.then(data => res.status(200).json(data))
	.catch(e => {
		if(e == 404){
			res.status(404).json({'error': 'el usuario no existe'})
		}else{
			res.status(500).json({'error': 'no se pudo actualizar el usuario'})
		}
	})
}

function deleteUserCtrl(req, res){
	const { userId } = req.params
	deleteUser(userId)
	.then(data => res.status(200).json(data))
	.catch(e => res.status(500).json({'error': 'no se pudo eliminar el usuario'}))
}

function loginUserCtrl(req, res){
	loginUser(req.body)
	.then(data => res.status(201).json(data))
	.catch(err => {
		if(err = 401){
			res.status(401).json({'error': 'credenciales de usuario inválidas'})
		}else if(err = 404){
			res.status(404).json({'error': 'el usuario no existe'})
		}else{
			res.status(500).json({'error': 'no se pudo autenticar el usuario'})
		}
	})
}

function logOutUserCtrl(req, res){
	logOutUser(req.token)
	.then(data => res.status(200).json({'ok': 'sesión finalizada'}))
	.catch(err => res.status(500).json({'error': 'se produjo un error interno'}))
}

export {
    getUsersCtrl,
    createUserCtrl,
    findUserCtrl,
	modifyUserCtrl,
	deleteUserCtrl,
	loginUserCtrl,
	logOutUserCtrl
}