const express = require('express');
const Joi = require('joi');
const users = require('./routes/users')
const login = require('./routes/login')
const lists = require('./routes/lists')
const mongoose = require('mongoose');
const { MOGOURI } = require('./config/key')
var cors = require('cors')
var app = express()
app.use(cors())
// app.use(cors())
mongoose
    .connect(MOGOURI)
    .then(() => console.log('Connected to the mongoDB'))
    .catch(() => console.log("can not connect to mongodb"))

app.use(express.json());
app.use('/api/users', users);
app.use('/api/login', login);
app.use('/api/post', lists);

var port = process.env.PORT || 5000
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('worklist/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,'worklist','build','index.html'))
    })
}
app.listen(port, () => console.log(`Listening on port ${port}`));