import { useState } from 'react'
import { useContext } from 'react'
import LoginContext from './contexts/loginContext.jsx'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf, faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons'
import NavLink from "./NavLink.jsx"
import Logout from "./Logout.jsx"
import SearchBox from './forms/SearchBox.jsx'

function Nav(){
    const [showSearchBox, setShowSearchBox] = useState(false)
    const [display, setDisplay] = useState("dis-n")

    const { hasLoggedIn } = useContext(LoginContext);

    const showHideSearchBox = () => {
        setShowSearchBox(!showSearchBox)
    }

    const changeDisplay = () => {
        display === "dis-n" ? setDisplay("dis-f") : setDisplay("dis-n")
    }

    const hide = () => {
        setDisplay("dis-n")
    }

    return(
        <>
            <nav className="maxwid-136-6 mar-0-a">
                <div className="pos-f">
                    <Link to="/"><FontAwesomeIcon icon={faLeaf} className="col-t pad-1 neu-1-r perrad-50 cur-p" onClick={hide} /></Link>
                </div>
                <div className="dis-f jus-e">
                    <FontAwesomeIcon icon={faBars} className="swi480dis-n col-t pad-1 neu-1-r rad-0-5 cur-p" onClick={changeDisplay} />
                </div>
                <ul className={`${display} swi480dis-f vie-h-100 swi480hei-a dir-c swi480dir-r swi480jus-e ali-c chimar-1`} onClick={hide}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="col-t cur-p" onClick={showHideSearchBox} />
                    <NavLink link="/posts" text="Entradas" />
                    {
                        !hasLoggedIn ?
                            <NavLink link="/admin" text="Login" />
                        :
                        <>
                            <NavLink link="/admin/dashboard" text="Administrar" />
                            <li className="mar-0">
                                <Logout styles="mar-l-0 swi480mar-l-1 pad-1 tex-1-5 rad-0-5 col-q wei-600 bac-p cur-p" />
                            </li>
                        </>
                    }
                </ul>
            </nav>
            {
                showSearchBox ?
                    <SearchBox placeholder="Buscador" />
                :
                    ""
            }
        </>
    )
  }

  export default Nav