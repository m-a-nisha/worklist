const express = require('express');
const router = express.Router();
// const {List, validate} = require('../models/list')
const { User } = require('../models/user')
const auth = require('../middleware/auth')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


router.get('/mylist', auth, async (req, res) => {
    // req.user.password = undefined;
    const list = await User.findById(req.user._id).select("-password")
    // .then(result => console.log(result))
    // console.log(list.task);

    res.json(list)
})

router.put('/', auth, (req, res) => {
    // console.log(req.body)
    // console.log(req.user)
    req.user.password = undefined;
    User.findByIdAndUpdate(req.user._id, {
        $push: { title: req.body }
    }, {
        new: true
    }, (err, result) => {
        if (err) return res.status(422).json({ error: err })
        res.json(result)
        // console.log(result)
    })
})
router.put('/prior', auth, async (req, res) => {
    // console.log(req.body)
    // const id = mongoose.Types.ObjectId(req.body.task._id);
    // console.log(id)
    // req.user.password = undefined;
    const user = await User.findById(req.user._id)
    // res.send(user)
    const data = [...user.title]
    // res.send(data)
    data.map(item => (
        // req.body._id === item._id &&
        // item._id = false
        // console.log(item._id.toString())
        item._id.toString() === req.body.task._id ?
            item.isprior = true
            :
            console.log()
    ))
    // console.log(data)

    User.findByIdAndUpdate(req.user._id, {
        $set: { title: data }
    }, {
        new: true
    }, (err, result) => {
        if (err) return res.status(422).json({ error: err })
        res.json(result)
        // console.log(result)
    })

})

router.put('/delete', auth, (req, res) => {
    req.user.password = undefined;

    // console.log(req.body.title.item)
    User.findByIdAndUpdate(req.user._id, {
        $pull: { title: req.body.title.item }
    }, {
        new: true
    }, (err, result) => {
        if (err) return res.status(422).json({ error: err })
        res.json(result)
        // console.log(result)
    })
})

router.post('/:id', auth, async (req, res) => {

    let user = await User.findOne({ _id: req.params.id })
    let searchuser = await User.findOne({ name: req.body.name })
    if (searchuser) return res.status(400).send({ error: "Username Already exist" });

    const newPassword = req.body.password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt)
    const newName = req.body.name;    
    user.name = newName
    await user.save()
    res.json(user);

})

module.exports = router;