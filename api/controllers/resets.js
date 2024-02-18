import { modifyPassword } from '../services/resets.js'

function modifyPasswordCtrl(req, res){
    const { hash } = req.params
    modifyPassword(hash, req.body)
	.then((user) => res.status(201).json(user))
	.catch(err => { res.status(500).json({'error': 'se produjo un error interno'})
    })
}

export {
    modifyPasswordCtrl
}