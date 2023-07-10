import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Button } from '@mui/material'
import '../styles/Task.css'
import AddUserModal from '../components/AddUserModal'
import UserDatatable from '../components/UserDatatable'
import { getAllUser } from '../api/userAuthApi'

const Task = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([])

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const getAlluser_details = async () => {
        const user_data = await getAllUser()
        console.log('user_data', user_data.data)
        setData(user_data.data)
    }

    useEffect(() => {
        getAlluser_details()

    }, [])


    const handleFormSubmit = (taskData) => {
        console.log(taskData);
        handleModalClose();
    };

    const handleEdit = (taskData) => {
        console.log('Edit task:', taskData);
        handleModalClose();
    };

    const handleDelete = (taskData) => {
        console.log('Delete task:', taskData);
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
                            <h1>User</h1>
                            <small>Home / User</small>
                        </div>
                        <div className="page-content">
                            <div className="records table-responsive">
                                <div className="add-button-container">
                                    <Button variant="contained" onClick={handleModalOpen}
                                        className="add-button" style={{ background: '#00AFB9' }}>
                                        Add User
                                    </Button>
                                </div>
                                <UserDatatable data={data} onEdit={handleEdit} onDelete={handleDelete} />
                            </div>
                            <AddUserModal
                                isOpen={isModalOpen}
                                onClose={handleModalClose}
                                onSubmit={handleFormSubmit}
                            />
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default Task