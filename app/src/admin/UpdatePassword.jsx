import { useState } from 'react'
import PrettyLink from '../PrettyLink.jsx'
import Submit from '../forms/Submit.jsx'
import PasswordInput from '../forms/PasswordInput.jsx'

function UpdatePassword(){
    const [message, setMessage] = useState("")
    const [messageStyles, setMessageStyles] = useState("")

    const checkForm = (e) => {
        const elements = e.target.elements
        for(let element of elements){
            if(!element.checkValidity()){
                return false
            }
        }
        const compare = formConvert(e.target)
        return compare.password === compare.repeat_password ? true : false
    }

    const formConvert = (form) => {
        const formData = new FormData(form)
        return Object.fromEntries(formData)
    }

    const resetForm = (e) => {
        for(let el of e.target.elements) {
            el.value = ""
        }
    }

    const updatePassword = (e) => {
        e.preventDefault()
        if(checkForm(e)){
            const options = {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
                },
                body: JSON.stringify(formConvert(e.target))
            }

            fetch(`http://localhost:2023/users/${localStorage.getItem("_id")}`, options)
            .then(res => {
                if(res.status === 200){
                    setMessage("La clave se actualizó correctamente")
                    resetForm(e)
                    setMessageStyles("col-s")

                }else{
                    setMessage("Hay errores en el formulario")
                    setMessageStyles("errcol")
                }
            })
            .catch(err => setMessage(err.error))
        }else{
            setMessage("Las claves no coinciden")
            setMessageStyles("errcol")
        }
    }

    return(
        <div>
            <p className={`mar-t-2 adj-c tex-2 ${messageStyles}`}>{message}</p>
            <div className="dis-f jus-e mar-t-4 chimar-l-2">
                <PrettyLink link="/admin/dashboard" icon="faCircleChevronLeft" title="Volver al panel" />
            </div>
            <form className="chidis-f chidir-c mar-t-1 chimar-t-2 neu-1 pad-2 rad-1" onSubmit={updatePassword}>
                <PasswordInput label="Ingresá la nueva clave" name="password" min="8" max="60"  />
                <PasswordInput label="Repetí la nueva clave" name="repeat_password" min="8" max="60" />
                <Submit text="Cambiar Clave" />
            </form>
        </div>
    )
}

export default UpdatePassword