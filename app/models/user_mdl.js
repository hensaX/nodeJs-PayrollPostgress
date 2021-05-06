const { Module } = require('./../../configs/Module')
const mongoose = new Module().mongoose()

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User Id is Required'],
        trim: true,
        minlength: 6,
        maxlength: 255

    },
    userPassword: {
        type: String,
        required: [true, 'Password is Required'],
        trim: true,
        minlength: 6,
        maxlength: 1024

    },
    userName: {
        type: String,
        required: [true, 'Name Id is Required'],
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    userEmail: {
        type: String,
        required: [true, 'Name Id is Required'],
        trim: true,
        minlength: 1,
        maxlength: 255,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please give a valid email address']

    },
    userGroup: {
        type: String,
        trim: true,
        required: [true, 'Flag Change Password is Required']
    },
    userDisable: {
        type: Number,
        required: [true, 'Flag User Disable Password is Required']
    },
    changePassword: {
        type: Number,
        required: [true, 'Flag Change Password is Required']
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
}, { collection: 'user' });

let userColl = mongoose.model('userColl', userSchema)
module.exports = { userColl }
