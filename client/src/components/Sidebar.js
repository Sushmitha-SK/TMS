import React, { useEffect } from 'react'
import '../styles/Dashboard.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import userImage from '../assets/user.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../api/userAuthApi';

const Sidebar = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.login.data);

    console.log('Sidebar data', data)

    const getUserData = async () => {
        const data = await getUserInfo()
        console.log('User Info', data)
    }

    useEffect(() => {
        getUserData()
    }, [])


    const loginData = useSelector((state) => state.login.data.user.role);
    const userDetails = useSelector((state) => state.login.data.user);

    const isAdmin = loginData === 'admin';

    return (
        <>
            <input type="checkbox" id="menu-toggle" />
            <div className="sidebar sidebarContent" style={{ background: '#fff' }}>
                <div className="side-header" style={{ textAlign: 'center' }}>
                    <h3>T<span>ask Management System</span></h3>
                </div>
                <div className="side-content">
                    <div className="profile">

                        <div className="profile-img bg-img" style={{ backgroundImage: `url(${userImage})` }} />
                        <h4 style={{ color: '#333' }}>{userDetails.name.toUpperCase()}</h4>
                        <small>{userDetails.role}</small>
                    </div>
                    <div className="side-menu">
                        <ul>
                            {isAdmin ? (
                                <li>
                                    <Link to="/dashboard-admin">
                                        <a>
                                            <span className="las la-home" />
                                            <small>Dashboard</small>
                                        </a>
                                    </Link>

                                </li>
                            ) : (
                                <li>
                                    <Link to="/dashboard">
                                        <a>
                                            <span className="las la-home" />
                                            <small>Dashboard</small>
                                        </a>
                                    </Link>

                                </li>
                            )}

                            {isAdmin && (
                                <li>
                                    <Link to="/user">
                                        <a>
                                            <span className="las la-user" />
                                            <small>User</small>
                                        </a>
                                    </Link>
                                </li>
                            )}

                            {isAdmin ? (
                                <li>
                                    <Link to="/task-admin">
                                        <a>
                                            <span className="las la-tasks" />
                                            <small>Tasks</small>
                                        </a>
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/task">
                                        <a>
                                            <span className="las la-tasks" />
                                            <small>Tasks</small>
                                        </a>
                                    </Link>
                                </li>
                            )}




                            <li>
                                <Link to="/profile">
                                    <a>
                                        <span className="las la-user-alt" />
                                        <small>Profile</small>
                                    </a>
                                </Link>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar