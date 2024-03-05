import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PrettyLink from '../PrettyLink.jsx'
import Submit from '../forms/Submit.jsx'

function PostDelete(){
    const [errors, setErrors] = useState("")
    const [post, setPost] = useState("")
    const {postId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:2023/posts/${postId}`)
        .then(res => res.json())
        .then(data => setPost(data))
        .catch(err => err)
    }, [])

    const deletePost = (e) => {
        e.preventDefault()
            const options = {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
                }
            }
    
            fetch(`http://localhost:2023/users/${localStorage.getItem("_id")}/posts/${postId}`, options)
            .then(res => res.status === 403 ? setErrors("No existe la entrada de blog") : navigate('/admin/posts', {replace: true}))
            .catch(err => setErrors(err.error))
    }
    
    return (
        <>
            <h1 className="swi1366tex-4 adj-c">Eliminación de entrada de blog: {post.title}</h1>
            <div>
                <p className="mar-t-4 adj-c errcol tex-2">{errors}</p>
                <div className="dis-f jus-e mar-t-4 chimar-l-2">
                    <PrettyLink link="/admin/posts" icon="faCircleChevronLeft" title="Volver a entradas" />
                </div>
                <form className="chidis-f chidir-c mar-t-1 chimar-t-2 neu-1 pad-2 rad-1" onSubmit={deletePost}>
                    <p className="tex-2-2">Advertencia: esta operación no se puede deshacer</p>
                    <Submit text="Eliminar" styles="rad-0-5 pad-2 hovbac-d cur-p" />
                </form>
            </div>
        </>
    )
}

export default PostDelete