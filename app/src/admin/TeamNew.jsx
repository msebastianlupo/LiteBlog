import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmailInput from '../forms/EmailInput.jsx'
import PasswordInput from '../forms/PasswordInput.jsx'
import SelectInput from '../forms/SelectInput.jsx'
import Submit from '../forms/Submit.jsx'

function TeamNew(){
    const [errors, setErrors] = useState("")
    const navigate = useNavigate()

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

    const sendUser = (e) => {
        e.preventDefault()
        if(checkForm(e)){
            const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
                },
                body: JSON.stringify(formConvert(e.target))
            }
    
            fetch(`http://localhost:2023/users/`, options)
            .then(res => res.status === 400 ? setErrors("Hay errores en el formulario") : navigate('/admin/team', {replace: true}))
            .catch(err => setErrors(err.error))
        }
    }
    
    return (
        <>
            <h1 className="swi1366tex-4 adj-c">Nuevo usuario</h1>
            <div>
                <p className="mar-t-4 adj-c tex-2">{errors}</p>
                <form className="chidis-f chidir-c mar-t-2 chimar-t-2 neu-1 pad-2 rad-1" onSubmit={sendUser}>
                    <EmailInput label="Email" name="email" required={true} />
                    <PasswordInput label="Clave" name="password" min="8" max="60" />
                    <SelectInput label="Rol" name="role" options={["editor", "admin"]} required={true} />
                    <Submit text="Crear" />
                </form>
            </div>
        </>
    )
}

export default TeamNew