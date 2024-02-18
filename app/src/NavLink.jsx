import { Link } from "react-router-dom"

function NavLink({link, text}){
  

    return(
        <li><Link to={link} className="col-t wei-600 pad-1 rad-0-5">{text}</Link></li>
    )
  }

  export default NavLink