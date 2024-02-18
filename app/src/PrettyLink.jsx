import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

function PrettyLink({link, icon, title=""}){

    return(
        <Link to={link}>
            <FontAwesomeIcon icon={fas[icon]} title={title} className={"hei-3 pad-1 col-q neu-1 hovneu-1-r rad-0-5"} />
        </Link>
    )
}

export default PrettyLink