import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PrettyLink from '../PrettyLink.jsx'
import Submit from '../forms/Submit.jsx'

function TeamDelete(){
    const [errors, setErrors] = useState("")
    const [userData, setUserData] = useState("")
    const {userId} = useParams()
    const navigate = useNavigate()

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

    const disableUser= (e) => {
        e.preventDefault()
            const options = {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
                }
            }
    
            fetch(`http://localhost:2023/users/${userId}`, options)
            .then(res => res.status === 403 ? setErrors("Solo un administrador puede realizar la operación") : navigate('/admin/team', {replace: true}))
            .catch(err => setErrors(err.error))
    }
    
    return (
        <>
            <h1 className="swi1366tex-4 adj-c">Desactivar usuario {userData.email}</h1>
            <div>
                <p className="mar-t-4 adj-c errcol tex-2">{errors}</p>
                <div className="dis-f jus-e mar-t-4 chimar-l-2">
                    <PrettyLink link="/admin/team" icon="faCircleChevronLeft" title="Volver a usuarios" />
                </div>
                <form className="chidis-f chidir-c mar-t-1 chimar-t-2 neu-1 pad-2 rad-1" onSubmit={disableUser}>
                    <p className="tex-2-2">Advertencia: esta operación no se puede deshacer</p>
                    <Submit text="Eliminar" styles="rad-0-5 pad-2 hovbac-d cur-p" />
                </form>
            </div>
        </>
    )
}

export default TeamDelete