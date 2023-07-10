import React, { useEffect, useState } from 'react';
import { Modal, TextField, Select, MenuItem, FormControl, InputLabel, Button, TextareaAutosize } from '@mui/material';
import '../styles/Task.css'
import { addTask } from '../api/taskApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { addUser } from '../api/userAuthApi';

const AddUserModal = ({ isOpen, onClose, onSubmit }) => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')


    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const adduserdata = await addUser(name, email, password, role)
        console.log('Add user Data', adduserdata)
        toast.success('User added successfully')
        navigate('/user')
    };

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
                className="modal"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Add User</h2>
                        <button className="close-button" onClick={onClose}>
                            X
                        </button>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required

                        />

                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required

                        />

                        <TextField
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required

                        />

                        <FormControl fullWidth required>
                            <InputLabel className="form-control-label">Role</InputLabel>
                            <Select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                            </Select>
                        </FormControl>



                        <Button
                            variant="contained"
                            type="submit"
                            className="add-task-button"
                            style={{ background: '#00AFB9', width: '200px', height: 'auto' }}
                        >
                            Add User
                        </Button>


                    </form>
                </div>
            </Modal>
        </>
    );
};

export default AddUserModal;
