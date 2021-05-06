const { Module } = require('./../../configs/Module')
const jwt = new Module().jwt()
const { CustomeMessage } = require('../helpers/customeMessage')
const { decode } = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // function custome message

  const msg = new CustomeMessage(req, res)
  try {
    if (process.env.JWT_ACTIVE == 0) { return next(); }
    // function get token from headers
    const token = req.header('auth-token');
    // function check token is ready

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    // isi data session

    if (decoded) {
      // return next if true
      if (typeof decoded.coid === 'undefined' || decoded.coid === '') { msg.error(401, 'Unauthorized access, invalid token, no coid') }
      req.mySession = decoded;
      //console.log(decoded)
      return next()
    }
  } catch (err) {
    //msg if token failed or expaired
    msg.error(401, 'Unauthorized access, invalid token')
  }

}