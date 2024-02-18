import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ErrorSite from "./ErrorSite"
import Comments from './Comments.jsx'
import CommentNew from './CommentNew.jsx'
import '../public/quill-fix.css'

function PostView(){
    const [post, setPost] = useState({})
    const {postId} = useParams()

    useEffect(() => {
        fetch(`http://localhost:2023/posts/${postId}`)
        .then(res => res.json())
        .then(data => setPost(data))
        .catch(err => err)
    }, [])

    if(post.title){
        return (
            <>
                <h1 className="swi1366tex-4 adj-c">{post.title}</h1>
                <p className="dis-i-b mar-t-8 wei-400 pad-0-5 col-t tex-1-4 bac-s rad-0-5">{post.category} | {post.created}</p>
                <div className="mar-t-4 tex-1-8 ql-posts" dangerouslySetInnerHTML={{ __html: post.text }} />
                <Comments />
                <CommentNew />
            </>
        )
    }else{
        return <ErrorSite />
    }
}

export default PostView