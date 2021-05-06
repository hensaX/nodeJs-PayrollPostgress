const morgan = require('morgan');
const express = require('express');
const dotenv = require('dotenv');
const EventEmitter = require('events')
const bodyParser = require('body-parser')
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')

class Module {
    constructor(app) {
        this.app = app
    }
    morgan() {
        const { app } = this
        app.use(morgan('dev'))
    }
    dotenv() {
        return dotenv.config()
    }
    bodyParser() {
        const { app } = this

        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
    }
    event() {
        const events = new EventEmitter()
        return events
    }
    mongoose() {
        mongoose.Promise = global.Promise
        return mongoose
    }
    jwt() {
        return jsonwebtoken
    }

}


module.exports = { Module }