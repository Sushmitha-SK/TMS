import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import DataTable from '../components/DataTable'
import { Button } from '@mui/material'
import '../styles/Task.css'
import AddTaskModal from '../components/AddTaskModal'
import { getAllTask, getUserTask } from '../api/taskApi'

const Task_Admin = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([])

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const getTaskDetails = async () => {
        const task_data = await getAllTask()
        console.log('Task Details', task_data)
        setData(task_data.data)
    }


    useEffect(() => {
        getTaskDetails()

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
                            <h1>Task</h1>
                            <small>Home / Task</small>
                        </div>
                        <div className="page-content">
                            <div className="records table-responsive">
                                <div className="add-button-container">
                                    <Button variant="contained" onClick={handleModalOpen}
                                        className="add-button" style={{ background: '#00AFB9' }}>
                                        Add Task
                                    </Button>
                                </div>
                                <DataTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
                            </div>
                            <AddTaskModal
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
export default Task_Admin