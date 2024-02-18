import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function CommentCard({name, date, comment}){
    return (
        <div className="mar-t-4 pad-2 rad-1 bor-0-1">
            <div className="dis-f">
                <FontAwesomeIcon icon={faUser} />
                <p className="ttr-u tex-1-3 col-t mar-l-1">{name} | {date}</p>
            </div>
            <p className="tex-2 mar-t-2">{comment}</p>   
        </div>
    )
}

export default CommentCard