import { useState, useEffect } from 'react'
import PrettyLink from '../PrettyLink.jsx'
import TableHead from '../TableHead.jsx'
import TableBodyUsers from '../TableBodyUsers.jsx'

function TeamAms(){
    const [users, setUsers] = useState([])
    useEffect(() => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        }
        fetch(`http://localhost:2023/users`, options)
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [])

    return(
        <>
            <h1 className="swi1366tex-4 adj-c">Administración de usuarios</h1>
            <div className="dis-f jus-e mar-t-4 chimar-l-2">
                <PrettyLink link="/admin/dashboard" icon="faCircleChevronLeft" title="Volver al panel" />
                <PrettyLink link="/admin/team/new" icon="faCirclePlus" title="Nuevo usuario" />
            </div>
            <div className="ove-x-a maxwid-100">
                {
                    users.length > 0 ?
                        <div className="ove-x-a maxwid-100 mar-t-1">
                            <table className="ove-h perwid-100 bcl-c adj-c pad-1 rad-1">
                                <TableHead ths={["ID", "Usuario", "Rol", "Acciones"]} />
                                <TableBodyUsers users={users} />
                            </table>
                        </div>
                    : <p className="pad-1 bor-0-1 adj-c rad-0-5">No hay usuarios</p>
                }
            </div>
        </>
    )
}

export default TeamAms