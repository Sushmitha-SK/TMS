import React, { useEffect, useRef, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Modal, Button } from '@mui/material';
import * as d3 from 'd3';
import '../styles/DataTable.css';
import EditTaskModal from './EditTaskModal';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { deleteTask } from '../api/taskApi';

const DataTable = ({ data, onEdit, onDelete }) => {
    const tableRef = useRef(null);

    const [selectedRowData, setSelectedRowData] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [open, setOpen] = useState(false)
    const [rowDataToDelete, setRowDataToDelete] = useState(null)



    useEffect(() => {
        if (data.length) {
            const table = d3.select(tableRef.current);

            table.selectAll('*').remove();

            const header = table.append('thead').append('tr');
            header
                .selectAll('th')
                .data(Object.keys(data[0]))
                .enter()
                .append('th')
                .text((d) => d.charAt(0).toUpperCase() + d.slice(1))

            const body = table.append('tbody');
            const rows = body
                .selectAll('tr')
                .data(data)
                .enter()
                .append('tr');

            rows
                .selectAll('td')
                .data((d) => Object.values(d))
                .enter()
                .append('td')
                .text((d) => d)
                .style('word-wrap', 'break-word');


            const handleEdit = (event) => {
                const row = event.target.parentNode.parentNode;
                const rowIndex = row.rowIndex - 1;
                const rowData = data[rowIndex];
                onEdit(rowData);

                setSelectedRowData(rowData);
                setIsEditModalOpen(true);
            };

            const handleDelete = (event) => {
                const row = event.target.parentNode.parentNode;
                const rowIndex = row.rowIndex - 1;
                const rowData = data[rowIndex];
                setOpen(true);
                setRowDataToDelete(rowData);
            };


            rows
                .append('td')
                .append(() => {
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', handleEdit);
                    return editButton;
                });

            rows
                .append('td')
                .append(() => {
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', handleDelete);
                    return deleteButton;

                });
        }
    }, [data]);

    const handleModalClose = () => {
        setSelectedRowData(null);
        setIsEditModalOpen(false);
    };

    const handleConfirmation = async (confirmed) => {
        setOpen(false);
        if (confirmed) {
            console.log('rowDataToDelete', rowDataToDelete._id)
            const id = rowDataToDelete._id
            const deleteData = await deleteTask(id)
            console.log('FE Response', deleteData)
        }
    };

    return (
        <>
            <div className="table-container">
                <Table ref={tableRef}>
                    <TableHead />
                    <TableBody />
                </Table>
            </div>

            <EditTaskModal isOpen={isEditModalOpen} onClose={handleModalClose} data={selectedRowData} />

            <Dialog open={open} onClose={() => handleConfirmation(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this task?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleConfirmation(false)}>Cancel</Button>
                    <Button onClick={() => handleConfirmation(true)} variant="contained" color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default DataTable;
