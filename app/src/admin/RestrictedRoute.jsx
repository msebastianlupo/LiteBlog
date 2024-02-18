import { Navigate } from 'react-router-dom'

function RestrictedRoute({children}){
    if(!localStorage.getItem("token")){
        return <Navigate to="/admin" replace={true} />
    }
    return children
}

export default RestrictedRoute