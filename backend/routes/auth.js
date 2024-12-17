const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "VirendraRathva";

//Route 1
// endpoint api/auth/createuser
router.post('/createuser',
    // applying express validator to check specific condition for parsed data
    [
        body('name').isLength({ min: 3 }),
        body('email').isEmail(),
        body('password').isLength({ min: 5 })
    ],
    async (req, res) => {
        let success = false;
        //express validator 
        const error = validationResult(req);
        // checking array of error is empty or not
        if (!error.isEmpty()) {
            return res.status(400).json({ success: false, error: error.array() });
        }

        try {
            //searching user
            let user = await User.findOne({ email: req.body.email });
            //check if user exist or not
            if (user) {
                return res.status(400).json({ success: false, error: "User alredy exist with same email." });
            }
            //hashing and salting password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            //creating new user
            user = await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPass
            });

            // generating user token
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);

            res.json({ success: true, authToken });

        } catch (error) { //catching error
            console.error(error);
            res.status(500).json({ success: false, error: "Sone internal server error occurd." });
        }
    });

//Route 2
// Authenticate user endpoint api/auth/login
router.post('/login',
    [
        body('email').isEmail(),
        body('password').exists()
    ],
    async (req, res) => {
        let success = false;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const { email, password } = req.body;
        try {
            //fetching user data using email
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, error: "Please enter correct credential." });
            }
            //checking password
            const checkedPass = await bcrypt.compare(password, user.password);
            if (!checkedPass) {
                return res.status(400).json({ success: false, error: "Please enter correct credential." });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ success: true, authtoken });

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: "Sone internal server error occurd." });
        }
    }
);

//Router 3
router.post('/getuser', fetchuser, async (req, res) => {
    let success = false;
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Sone internal error occurd." });
    }
});

module.exports = router;