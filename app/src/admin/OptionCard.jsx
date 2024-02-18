import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

function OptionCard({name, btnText, link, icon, size="8"}){
    
    return(
        <div className="perwid-100 swi480wid-30 bor-0-1">
            <FontAwesomeIcon icon={fas[icon]}  className={"hei-" + size} />
            <div>
                <p className="wei-200 tex-2 mar-t-1">{name}</p>
                <Link to={link} className="mar-t-3 dis-i-b pad-1 tex-1-8 perwid-100 rad-0-5 neu-1 trasha-0-3 hovneu-1-r">{btnText}</Link>
            </div>
        </div>
    )
}

export default OptionCard