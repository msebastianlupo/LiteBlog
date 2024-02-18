import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Submit from '../forms/Submit.jsx'
import SelectInput from '../forms/SelectInput.jsx'

function TeamEdit(){
    const {userId} = useParams()
    const [userData, setUserData] = useState("")
    const [message, setMessage] = useState("")
    const [messageStyles, setMessageStyles] = useState("")

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
            }
        }

        fetch(`http://localhost:2023/users/${userId}`, options)
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(err => err)
    }, [])

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

    function preventChangePassword(form){
        const formCopy = {...form}
        return formCopy
    }

    const formConvert = (form) => {
        const formData = new FormData(form)
        const secureForm = preventChangePassword(Object.fromEntries(formData))
        return secureForm
    }

    const modifyUser = (e) => {
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
    
            fetch(`http://localhost:2023/users/${userId}`, options)
            .then(res => {
                if(res.status === 200){
                    setMessage("El rol se modificó correctamente")
                    setMessageStyles("col-s")
                }
                else if(res.status === 403){
                    setMessage("Solo un administrador puede realizar la operación")
                    setMessageStyles("errcol")
                }
                else{
                    setMessage("Hay errores en el formulario")
                    setMessageStyles("errcol")
                }
            })
            .catch(err => setMessage(err.error))
        }
    }

    return(
        <>
            <h1 className="swi1366tex-4 adj-c">Modificar rol de usuario {userData.email}</h1>
        <div>
                <p className={`mar-t-4 adj-c tex-2 ${messageStyles}`}>{message}</p>
                <form className="chidis-f chidir-c mar-t-2 chimar-t-2 neu-1 pad-2 rad-1" onSubmit={modifyUser}>
                    <SelectInput label="Rol de usuario" name="role" options={["editor", "admin"]} required={true} value={userData.role} />
                    <Submit text="Modificar rol" />
                </form>
            </div>
        </>
    )
}

export default TeamEdit