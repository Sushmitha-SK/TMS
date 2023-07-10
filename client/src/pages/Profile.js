import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Button } from '@mui/material'
import '../styles/Task.css'
import { useSelector } from 'react-redux'
import EditUserModal from '../components/EditUserModal'
import userImage from '../assets/user.png'
import '../styles/Profile.css'

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([])

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const userDetails = useSelector((state) => state.login.data.user);

    const handleEditProfile = () => {
        setData(userDetails)
    }

    const handleFormSubmit = (userDetails) => {
        console.log(userDetails);
        handleModalClose();
    };


    return (
        <>
            <div>
                <Sidebar />

                <div className="main-content">
                    <Header />
                    <main>
                        <div className="page-header">
                            <h1>Profile</h1>
                            <small>Home / Profile</small>
                        </div>
                        <div className="page-content">

                            <div className="records table-responsive">
                                <div className="profile-card-centered">
                                    <div className="profile-card" >
                                        <div className="profile-card__header">
                                            <div className="profile-card__header__pic">
                                                <img src={userImage} alt="" />
                                            </div>
                                            <h2>{userDetails.name}</h2>
                                            <p>{userDetails.role}</p>
                                            <p style={{ fontWeight: 400 }}>{userDetails.email}</p>
                                            <Button onClick={handleModalOpen} sx={{
                                                borderRadius: 3, marginTop: 3, color: '#fff',
                                                backgroundColor: '#00AFB9',
                                                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
                                                width: '150px',
                                                '&:hover': {
                                                    backgroundColor: '#008B99',
                                                },
                                            }}
                                            >Edit Profile</Button>
                                        </div>
                                    </div>
                                </div>
                                <EditUserModal
                                    isOpen={isModalOpen}
                                    onClose={handleModalClose}
                                    onSubmit={handleFormSubmit}
                                />

                            </div>

                        </div>
                    </main>
                </div >
            </div >


        </>
    )
}
export default Profile