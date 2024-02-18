import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import LoginContext from './contexts/loginContext.jsx'
import Submit from './forms/Submit.jsx'

function Logout({styles=""}){
    const navigate = useNavigate()
    const { setHasLoggedIn } = useContext(LoginContext)

    const logout = (e) => {
        e.preventDefault()
        const options = {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
            }
        }

        fetch(`http://localhost:2023/session`, options)
        .then(res => {
            if(res.status === 200){
                localStorage.removeItem("token")
                localStorage.removeItem("email")
                localStorage.removeItem("_id")
                navigate('/admin', {replace: true})
                setHasLoggedIn(false)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <form onSubmit={logout}>
            <Submit styles={styles} text="Logout" />
        </form>
    )
}

export default Logout