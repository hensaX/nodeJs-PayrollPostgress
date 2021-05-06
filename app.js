const express = require('express');
const app = express();
const { Module } = require('./configs/Module');

//init all module
const mod = new Module(app)
mod.bodyParser()
mod.dotenv()
mod.morgan()

module.exports = { app }
