import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function Restored(){


    return (
        <>
            <h1 className="swi1366tex-4 adj-c">¡Recuperaste tu cuenta!</h1>
            <div className="mar-t-4 dis-f jus-c">
                <Link className="pad-2 tex-2 bac-s hovbac-t rad-1" to="/admin">Iniciar Sesión</Link>
            </div>
        </>
    )
}

export default Restored