import { useState } from 'react'
import LoginContext from './contexts/loginContext.jsx'
import Header from './Header.jsx'
import Content from './Content.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'

function Skeleton(){
    const [hasLoggedIn, setHasLoggedIn] = useState(localStorage.getItem("token"))

    return (
        <LoginContext.Provider value={{hasLoggedIn, setHasLoggedIn}}>
            <div className="dis-f dir-c jus-s-b vie-h-100">
                <div>
                    <Header />
                </div>
                <div>
                    <Content>
                        <Outlet />
                    </Content>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </LoginContext.Provider>
    )
}

export default Skeleton