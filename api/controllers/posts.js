import { getPosts, findPost, createPost, modifyPost, deletePost, getUserPosts, findUserPost } from '../services/posts.js'

function getPostsCtrl(req, res){
	getPosts(req.query)
	.then(posts => res.status(200).json(posts))
	.catch(e => res.status(500).json({'error': 'se produjo un error interno'}))
}

function createPostCtrl(req, res){
	const { userId } = req.params
	createPost(userId, req.body)
	.then((post) => res.status(201).json(post))
	.catch(err => {
		if(err === 400){
			res.status(400).json({'error': 'el post ya existe'})
		}else{
			res.status(500).json({'error': 'se produjo un error interno'})
		}
	})
}

function findPostCtrl(req, res){
    const { postId } = req.params
    findPost(postId)
	.then(post => res.status(200).json(post))
	.catch(e => res.status(404).json({'error': 'no se encontró el post'}))
}

function findUserPostCtrl(req, res){
	const {userId, postId} = req.params
	findUserPost(userId, postId)
	.then(post => res.status(200).json(post))
	.catch(e => res.status(404).json({'error': 'no se encontró el post'}))
}

function modifyPostCtrl(req, res){
	const { postId } = req.params
	modifyPost(postId, req.body)
	.then(data => res.status(200).json(data))
	.catch(e => {
		if(e === 404){
			res.status(404).json({'error': 'el post no existe'})
		}else if(e === 400){
			res.status(400).json({'error': 'no se actualizó el post'})
		}else{
			res.status(500).json({'error': 'se produjo un error interno'})
		}
	})
}

function deletePostCtrl(req, res){
	const { postId } = req.params
	deletePost(postId)
	.then(data => res.status(200).json(data))
	.catch(e => {
		if(e === 404){
			res.status(404).json({'error': 'el post no existe'})
		}else if(e === 400){
			res.status(400).json({'error': 'no se eliminó el post'})
		}else{
			res.status(500).json({'error': 'se produjo un error interno'})
		}
	})
}

function getUserPostsCtrl(req, res){
	const { userId } = req.params
	getUserPosts(userId)
	.then(data => res.status(200).json(data))
	.catch(s => res.status(404).json({'error': 'no existe/n post/s'}))
}

export {
    getPostsCtrl,
    createPostCtrl,
    findPostCtrl,
	modifyPostCtrl,
	deletePostCtrl,
	getUserPostsCtrl,
	findUserPostCtrl
}