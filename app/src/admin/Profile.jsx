import UpdatePassword from './UpdatePassword.jsx'

function Profile(){

    return(
        <>
            <h1 className="swi1366tex-4 adj-c">Perfil</h1>
            <h2 className="mar-t-2 adj-c">Cambiar clave de usuario</h2>
            <div>
                <UpdatePassword />
            </div>
        </>
    )
}

export default Profile