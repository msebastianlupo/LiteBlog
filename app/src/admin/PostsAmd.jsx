import { useState, useEffect } from 'react'
import PrettyLink from '../PrettyLink.jsx'
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
            <div className="dis-f jus-e mar-t-4 chimar-l-2">
                <PrettyLink link="/admin/dashboard" icon="faCircleChevronLeft" title="Volver al panel" />
                <PrettyLink link="/admin/posts/new" icon="faCirclePlus" title="Nueva entrada" />
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