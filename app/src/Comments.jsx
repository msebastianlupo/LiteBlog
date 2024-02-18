import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Submit from './forms/Submit.jsx'
import CommentCard from './CommentCard.jsx'

function Comments(){
    const [comments, setComments] = useState([])
    const {postId} = useParams()

    const getComments = (e) => {
        e.preventDefault()
        fetch(`http://localhost:2023/posts/${postId}/comments`)
        .then(res => res.json())
        .then(data => setComments(data.comments))
    }

    return(
        <>
            {
                comments.length ? 
                    <div className="mar-t-10">
                        {comments.map((comment, index) => <CommentCard key={comment.date} name={comment.name} date={comment.date} comment={comment.comment} />)}
                    </div>
                :   
                <form className="dis-f jus-c mar-t-10" onSubmit={getComments}>
                    <Submit text="Ver Comentarios" styles="rad-0-5 bac-t pad-2 cur-p"  />
                </form>
            }
        </>
    )
}

export default Comments