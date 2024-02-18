import { useState, useEffect } from 'react'
import PostCard from './PostCard.jsx'

function PostsList(){
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:2023/posts${location.search}`)
        .then(res => res.json())
        .then(data => setPosts(data))
    }, [])

    return (
        <>
            <h1 className="mar-t-10 swi1366tex-4 adj-c">Lista de entradas</h1>
            <div className="mar-t-4">
                {
                    posts.length ? 
                        posts.map((post, index) => <PostCard key={post._id} title={post.title} category={post.category} created={post.created} text={post.text} link={"/posts/" + post._id} />)
                    : <p className="mar-t-2 adj-c">No hay publicaciones</p>
                }
            </div>
        </>
    )
}

export default PostsList