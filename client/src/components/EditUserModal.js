import React, { useEffect, useState } from 'react';
import {
    Modal,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    TextareaAutosize,
} from '@mui/material';
import { editUser, getAllUser } from '../api/userAuthApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'


const EditUserModal = ({ isOpen, onClose, data }) => {
    const [id, setId] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        console.log(data)
        if (data) {
            setId(data._id)
            setName(data.name);
            setEmail(data.email);
            setPassword(data.password);
            setRole(data.role);

        }
    }, [data]);

    const handleEditUser = async (e) => {
        e.preventDefault();
        const editdata = await editUser(id, name, email, password, role)
        console.log('editdata', editdata)
        toast.success('User details updated successfully')


    }

    return (
        <>
            <Modal open={isOpen} onClose={onClose} className="modal" >
                <div className="modal-content" style={{ height: '580px' }}>
                    <div className="modal-header">
                        <h2>Edit User</h2>
                        <button className="close-button" onClick={onClose}>
                            X
                        </button>
                    </div>
                    <form onSubmit={handleEditUser}>
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
                                onChange={(e) => setRole(e.target.value)}
                            // className="form-control-select"
                            >
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
                            Edit User
                        </Button>

                    </form>
                </div>
            </Modal>
        </>
    );
};

export default EditUserModal;
