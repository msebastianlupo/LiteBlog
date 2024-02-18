import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TableHead from '../TableHead.jsx'
import TableBodyPosts from '../TableBodyPosts.jsx'

function PostsAmd(){
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const options = {
            headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
            }
        }
        fetch(`http://localhost:2023/users/${localStorage.getItem('_id')}/posts`, options)
        .then(res => res.json())
        .then(data => setPosts(data))
    }, [])

    return(
        <>
            <h1 className="swi1366tex-4 adj-c">Administración de entradas de blog</h1>
            <div className="dis-f jus-e">
                <Link to="/admin/posts/new" className="dis-i-b mar-t-4 pad-2 rad-0-5 tex-1-8 bac-s hovbac-t col-q">Crear entrada</Link>
            </div>
            <div className="ove-x-a maxwid-100 mar-t-1">
                {
                    posts.length > 0 ?
                        <table className="ove-h perwid-100 bcl-c adj-c pad-1 rad-1">
                            <TableHead ths={["Creada", "Título", "Acciones"]} />
                            <TableBodyPosts posts={posts} />
                        </table>
                    : <p className="pad-1 adj-c bor-0-1 rad-0-5">No hay publicaciones</p>
                }
            </div>
        </>
    )
}

export default PostsAmd