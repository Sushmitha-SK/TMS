const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Task = require('../models/Task')
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Task using: GET "/api/task/getuser". Login required
router.get('/fetchalltask', fetchuser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/task/addtask". Login required
router.post('/addtask', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, assignedto, duedate, status } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const task = new Task({
                title,
                description,
                assignedto,
                duedate,
                status,
                user: req.user.id
            });
            const savedTask = await task.save()

            res.json(savedTask)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Task using: PUT "/api/task/updatetask". Login required
router.put('/updatetask/:id', fetchuser, async (req, res) => {
    const { title, description, assignedto, duedate, status } = req.body;
    try {
        // Create a newNote object
        const newTask = {};
        if (title) { newTask.title = title };
        if (description) { newTask.description = description };
        if (assignedto) { newTask.assignedto = assignedto };
        if (duedate) { newTask.duedate = duedate };
        if (status) { newTask.status = status };
        // if (assignedto) { newNote.assignedto = assignedto };

        // Find the note to be updated and update it
        let task = await Task.findById(req.params.id);
        if (!task) { return res.status(404).send("Not Found") }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        task = await Task.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true })
        res.json({ task });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Task using: DELETE "/api/task/deletetask". Login required
router.delete('/deletetask/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let task = await Task.findById(req.params.id);
        if (!task) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (task.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        task = await Task.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Task has been deleted", task: task });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 5: Get All Tasks belonging to all Users using: GET "/api/task/alltasks"
router.get('/alltasks', async (req, res) => {
    try {
        // Find all tasks
        const tasks = await Task.find();

        res.json(tasks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router