const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('role', 'Enter a valid role').isLength({ min: 3 }),
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            role: req.body.role,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);


        // res.json(user)
        res.json({ authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        const userDetails = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        res.json({ success: true, authtoken, user: userDetails });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 3: Get logged-in User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        // Get the user ID from the fetchuser middleware
        const userId = req.user.id;
        console.log('User ID', userId)

        // Find the user by ID excluding the password field
        const user = await User.findById(userId).select('-password');

        // Send the user details in the response
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


// ROUTE 4: Get all users with role "user" using: GET "/api/auth/getallusers". Login required
router.get('/getallusers', fetchuser, async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password');
        res.send(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


// ROUTE 5: Update user details using: PUT "/api/auth/updateuser/:id". Login required
router.put('/updateuser/:id', fetchuser, [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
    body('role', 'Enter a valid role').isLength({ min: 3 }),
], async (req, res) => {
    const { name, email, password, role } = req.body;
    const { id } = req.params;

    try {
        // Check if the user exists
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user details
        user.name = name;
        user.email = email;
        user.password = password;
        user.role = role;

        // Save the updated user
        user = await user.save();

        // Send the updated user details in the response
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


// ROUTE 6: Delete a user using: DELETE "/api/auth/deleteuser/:id". Login required
router.delete('/deleteuser/:id', fetchuser, async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the user exists
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user
        await user.deleteOne();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router