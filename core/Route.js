const { Login } = require('../app/routes/login_rts')
const { pn0010 } = require('../app/routes/pn0010_rts')

class Route {
  appInit() {
    return [
      // init 
      new Login().route(),
      new pn0010().route()

    ]
  }
}

module.exports = { Route }
