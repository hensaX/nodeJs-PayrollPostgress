const { Controller } = require('./../../core/Controller')
const pn0010_ctr = require('./../controllers/pn0010_ctr').pn0010;
const AuthToken = require('./../middlewares/AuthToken')

class pn0010 extends Controller {
    constructor() {
        super()
        this.auth = AuthToken
    }
    route() {
        const { auth } = this
        return [
            this.get('/pn0010', auth, (req, res) => new pn0010_ctr().tampils(req, res)),
            this.get('/pn0010/:empid', auth, (req, res) => new pn0010_ctr().tampil(req, res)),
            this.post('/pn0010', auth, (req, res) => new pn0010_ctr().tambah(req, res)),
            this.put('/pn0010', auth, (req, res) => new pn0010_ctr().ubah(req, res)),
            this.delete('/pn0010/:empid', auth, (req, res) => new pn0010_ctr().hapus(req, res))
        ]

    }

}

module.exports = { pn0010 }
