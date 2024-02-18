import { useState } from 'react'
import { useEffect } from 'react'
import OptionCard from './OptionCard.jsx'

function Panel(){
    const [userData, setUserData] = useState("")

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
            }
        }

        fetch(`http://localhost:2023/users/${localStorage.getItem('_id')}`, options)
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(err => err)
    }, [])

    const showOptions = () => {
        const options = [
            <OptionCard key={"profile"} name="Perfil" btnText="Configurar" link="/admin/profile" icon="faUserGear" />,
            <OptionCard key={"posts"} name="Entradas de blog" btnText="Gestionar" link="/admin/posts" icon="faRectangleList" />
        ]
        if(userData.role === "admin"){
            options.push(<OptionCard key={"team"} name="Equipo" btnText="Gestionar" link="/admin/team" icon="faUsers" />)
        }

        return options
    }

    return(
        <>
            <h1 className="swi1366tex-4 adj-c">Panel de administración</h1>
            <p className="mar-t-4 col-s wei-400 tex-2 adj-c">Hola {userData.email}</p>
            <div className="dis-f wra jus-c mar-t-2 chimar-2 chipad-2 chirad-1 chiadj-c">
                { showOptions() }
            </div>
        </>
    )
}

export default Panel