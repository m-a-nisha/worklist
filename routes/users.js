const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');
const { User, validate } = require('../models/user');

router.post('/', async (req, res) => {
    const { name, email, password} = req.body;

    const { error } = validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ error: "User already registered" });
    user = await User.findOne({ name: name });
    if (user) return res.status(400).json({ error: "Username already exist" });

    user = new User({
        name,
        email,
        password,
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    const token = user.generateAuthToken();
    res.header('auth-token', token).json({ message: "Successfully registerd" });
})

module.exports = router;