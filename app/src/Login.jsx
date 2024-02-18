
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import LoginContext from './contexts/loginContext.jsx'
import { Link } from "react-router-dom"
import EmailInput from './forms/EmailInput.jsx'
import PasswordInput from './forms/PasswordInput.jsx'
import Submit from './forms/Submit.jsx'

function Login(){
 const [errors, setErrors] = useState("")
 const navigate = useNavigate()

 const { setHasLoggedIn } = useContext(LoginContext);

    if(localStorage.getItem("token")){
        return <Navigate to="/admin/dashboard" replace={true} />
    }else{
        const checkForm = (e) => {
            const elements = e.target.elements
            for(let element of elements){
                if(!element.checkValidity()){
                    return false
                }
            }
            return true
        }
    
        const formConvert = (form) => {
            const formData = new FormData(form)
            return Object.fromEntries(formData)
        }
    
        const login = (e) => {
            e.preventDefault()
            if(checkForm(e)){
                const options = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formConvert(e.target))
                }
        
                fetch(`http://localhost:2023/session`, options)
                .then(res => {
                    if(res.status === 401){
                        setErrors("Las credenciales son incorrectas. Intentalo de nuevo")
                    }else if(res.status === 500){
                        setErrors("Ocurrió un error interno")
                    }
                    return res.json()
                })
                .then(res => {
                    if(res.errors || res.error){
                        throw(res)
                    }else{
                       localStorage.setItem("token", res.token)
                       localStorage.setItem("_id", res.account._id)
                       localStorage.setItem("email", res.account.email)
                       setHasLoggedIn(true)
                       navigate('/admin/dashboard', {replace: true})
                        
                    }
                })
                .catch(err => console.log(err))
            }
        }
    
        return (
            <>
                <h1 className="swi1366tex-4 adj-c">Iniciar sesión</h1>
                <div>
                    <p className="mar-t-4 adj-c errcol tex-2">{errors}</p>
                    <form className="chidis-f chidir-c mar-t-2 chimar-t-2 neu-1 pad-2 rad-1" onSubmit={login}>
                        <EmailInput label="Email" name="email" min="6" />
                        <PasswordInput label="Contraseña" name="password" min="8" max="60" />
                        <div className="dis-f ali-e">
                            <Link className="hovcol-t" to='/admin/recovery'>¿Olvidaste la contraseña?</Link>
                        </div>
                        <Submit text="Iniciar Sesión" />
                    </form>
                </div>
            </>
        )
    }
}

export default Login