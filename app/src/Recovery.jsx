
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import EmailInput from './forms/EmailInput.jsx'
import TextInput from './forms/TextInput.jsx'
import PasswordInput from './forms/PasswordInput.jsx'
import Submit from './forms/Submit.jsx'
import Restored from './Restored.jsx'

function Recovery(){
    const [isSent, setIsSent] = useState(false)
    const [isRestored, setIsRestored] = useState(false)
    const [messages, setMessages] = useState("")
    const [messageStyles, setMessageStyles] = useState("")

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

        const comparePassword = (e) => {
            const compare = formConvert(e.target)
            return compare.password === compare.repeat_password
        }
    
        const formConvert = (form) => {
            const formData = new FormData(form)
            return Object.fromEntries(formData)
        }

        const sendEmailWithHash = (e) => {
            e.preventDefault()
            if(checkForm(e)){
                const options = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formConvert(e.target))
                }

                setMessages("Se está generando el código, por favor, aguardá...")
                setMessageStyles("col-t")

                fetch(`http://localhost:2023/passwords`, options)
                .then(res => {
                    if(res.status === 201){
                        setIsSent(true)
                        setMessages("")
                    }else if(res.status === 404){
                        setMessages("El usuario no existe en la base de datos")
                        setMessageStyles("errcol")
                    }else{
                        setMessages("No se pudo generar el código")
                        setMessageStyles("errcol")
                    }
                    return res.json()
                })
            }else{
                setMessages("Hay errores en el formulario")
                setMessageStyles("errcol")
            }
        }

        const resetPassword = (e) => {
            e.preventDefault()
            if(checkForm(e) && comparePassword(e)){
                const options = {
                    method: 'PATCH',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formConvert(e.target))
                }

                fetch(`http://localhost:2023/resets/${e.target.hash.value}`, options)
                .then(res => {
                    if(res.status === 201){
                        setIsRestored(true)
                    }else{
                        setMessages("El código es incorrecto o el mismo expiró")
                        setMessageStyles("errcol")
                    }
                    console.log(res.status)
                    return res.json()
                })
            }else{
                setMessages("Hay errores en el formulario")
                setMessageStyles("errcol")
            }
        }
    
        return (
            <>
                {
                    isSent === false ? 
                    <div>
                        <h1 className="swi1366tex-4 adj-c">¿Olvidaste la contraseña?</h1>
                        <p className={`mar-t-4 adj-c tex-2 ${messageStyles}`}>{messages}</p>
                        <form className="chidis-f chidir-c mar-t-2 chimar-t-2 neu-1 pad-2 rad-1" onSubmit={sendEmailWithHash}>
                            <EmailInput label="Ingresá tu email de registro" name="email" min="6" />
                            <Submit text="Enviar código" />
                        </form>
                    </div>
                    :
                    <div>
                        {
                            isRestored ?
                                <Restored />
                            :
                            <div>
                                <h1 className="swi1366tex-4 adj-c">Cambiá tu contraseña usando el código que te llegó al email</h1>
                                <p className={`mar-t-4 adj-c tex-2 ${messageStyles}`}>{messages}</p>
                                <form className="chidis-f chidir-c mar-t-2 chimar-t-2 neu-1 pad-2 rad-1" onSubmit={resetPassword}>
                                    <TextInput label="Código que recibiste" name="hash" min="9" max="10" required={true} />
                                    <PasswordInput label="Nueva clave" name="password" min="8" max="60" />
                                    <PasswordInput label="Repetí la clave" name="repeat_password" min="8" max="60" />
                                    <Submit text="Enviar código" />
                                </form>
                            </div>
                        }
                    </div>

                }
            </>
        )
    }
}



export default Recovery