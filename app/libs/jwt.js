const { Module } = require('./../../configs/Module');
const mod = new Module();
const jwt = mod.jwt();

class Jwt {
    createToken(payload) {
        return jwt.sign({ ...payload }, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_EXP, algorithm: 'HS384' })
    }
}

module.exports = { Jwt }
