import { createPassword } from '../services/passwords.js'

function createPasswordCtrl(req, res){
    createPassword(req.body)
	.then((password) => res.status(201).json({}))
	.catch(err => {
        if(err === 404){
            res.status(404).json({'error': 'el usuario no existe en la base de datos'})
        }else{
            res.status(500).json({'error': 'se produjo un error interno'})
        }
    })
}

export {
    createPasswordCtrl
}