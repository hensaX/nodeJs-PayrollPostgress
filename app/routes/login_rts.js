const { Controller } = require('./../../core/Controller')
const AuthToken = require('./../middlewares/AuthToken')
const { User } = require('./../controllers/login_ctr')


class Login extends Controller {
    constructor() {
        super()
        this.auth = AuthToken
    }
    route() {
        const { auth } = this
        return [
            this.get('/login', auth, (req, res) => new User().tampils(req, res)),
            this.get('/login/:coid', auth, (req, res) => new User().tampilcoid(req, res)),
            this.get('/login/:coid/:userId', auth, (req, res) => new User().tampil(req, res)),
            this.post('/login/auth', (req, res) => new User().auth(req, res)),
            this.post('/login', auth, (req, res) => new User().tambah(req, res)),
            this.put('/login', auth, (req, res) => new User().ubah(req, res)),
            this.delete('/login/:coid/:userId', auth, (req, res) => new User().hapus(req, res))
        ]

    }

}

module.exports = { Login }
