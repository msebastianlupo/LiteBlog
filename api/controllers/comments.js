import { getComments, pushComment, deleteComments } from '../services/comments.js'


function getCommentsCtrl(req, res){
	const { postId } = req.params
	getComments(postId)
	.then(comments => res.status(200).json(comments))
	.catch(err => res.status(500).json({'error': 'se produjo un error interno'}))
}

function pushCommentCtrl(req, res){
	const { postId } = req.params
	pushComment(postId, req.body)
	.then((comment) => res.status(201).json(comment))
	.catch(err => {
		res.status(500).json({'error': 'se produjo un error interno'})
	})
}

export {
    getCommentsCtrl,
    pushCommentCtrl,
}