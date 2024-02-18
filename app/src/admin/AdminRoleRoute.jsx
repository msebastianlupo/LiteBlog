import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

function AdminRoleRoute({children}){
    const [component, setComponent] = useState("")

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
        .then(data => {
            if(data.role !== 'admin'){
                setComponent(<Navigate to="/admin" replace={true} />)
            }else{
                setComponent(children)
            }
        })
        .catch(err => err)
    }, [])

    return component
}

export default AdminRoleRoute