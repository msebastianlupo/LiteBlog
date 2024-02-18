import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf } from '@fortawesome/free-solid-svg-icons'

function Welcome(){
    return(
        <div className="adj-c">
            <FontAwesomeIcon className="pad-3 hei-5 neu-1-r perrad-50" icon={faLeaf} />
            <p className="mar-t-1">LiteBlog</p>
        </div>
    )
}

export default Welcome