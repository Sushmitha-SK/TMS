import React from 'react'
import '../styles/Dashboard.css'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'


const Header = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')

        toast.success('Logged out successfully')
        navigate('/login')
    }
    return (
        <>
            <header>
                <div className="header-content">
                    <label htmlFor="menu-toggle">
                        <span className="las la-bars" />
                    </label>
                    <div className="header-menu">

                        <div className="user">
                            <div className="bg-img" style={{ backgroundImage: 'url(img/1.jpeg)' }} />
                            <span className="las la-power-off" />
                            <span onClick={handleLogout}>Logout</span>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header