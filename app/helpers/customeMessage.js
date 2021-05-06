const { Module } = require('../../configs/Module');
const { Jwt } = require('./../libs/jwt');
const mod = new Module();

class CustomeMessage {
  constructor(req, res) {
    this.jwt = new Jwt()
    this.response = res
    this.events = mod.event()
    this.tokenId = (typeof req.mySession === 'undefined') ? '' : req.mySession
    this.hasil = {
      response: {
        status: 0,
        method: req.method,
        url: req.originalUrl,
      }
    }
  }
  success(statusCode, msg) {
    const { jwt } = this
    const hasil = this.hasil;

    //console.log('succes')
    // create newtoken
    if (typeof this.tokenId !== 'undefined' || this.tokenId !== '') {
      hasil.response.tokenId = jwt.createToken({
        coid: this.tokenId.coid, userId: this.tokenId.userId, userGroup: this.tokenId.userGroup
      })
    }
    // gabung message dengan default message
    if (typeof msg === 'object') { hasil.response = { ...hasil.response, ...msg } }
    else { hasil.response.message = msg }
    // masukan status code
    hasil.response.status = statusCode;


    const { response, events } = this
    events.once('success', () => response.status(statusCode).send(hasil))
    return events.emit('success')
  }
  error(statusCode, msg) {
    //console.log('error')
    let hasil = this.hasil;
    hasil.response.status = statusCode;
    if (typeof msg === 'object') { hasil.response = { ...hasil.response, ...msg } }
    else { hasil.response.message = msg }

    const { response, events } = this
    events.once('error', () => response.status(statusCode).send(hasil))
    return events.emit('error')
  }
}
module.exports = { CustomeMessage }
