const { Jwt } = require('./../libs/jwt')
const bcrypt = require('bcrypt');
const { pool } = require('./../../configs/ConnPg');
const { DBWraper } = require('./../../core/DBWraper');
const { CustomeMessage } = require('./../helpers/customeMessage');

class User {
    constructor() {
        this.jwt = new Jwt();

    }

    // start tambah
    async tambah(req, res) {
        const DBW = new DBWraper({ req, res })
        //const { coid, userid } = req.mySession;
        const { coid, userId, userName, userPassword, userGroup, userMail } = req.body

        if (typeof userPassword === 'undefined' || userPassword === '') {
            return new CustomeMessage(req, res).error(400, 'Password is Required')
        }

        const salt = await bcrypt.genSalt(10);
        const pwdEncrypt = await bcrypt.hash(userPassword, salt);


        await DBW.setStat({ table: 'gmuser', where: { coid, userId } })
        await DBW.selectQB();
        const { rowCount } = (await DBW.rowQB());

        if (rowCount == 1) {
            return new CustomeMessage(req, res).error(409, 'Failed! Data already exists in database')
        }
        await DBW.setStat({ table: 'gmuser', field: { coid, userId, userName, userPassword: pwdEncrypt, userGroup, userMail, userstatus: 'Active' } })
        await DBW.insertQB();
        return (await DBW.cmdQB())
    }

    // start hapus
    async hapus(req, res) {
        const DBW = new DBWraper({ req, res })
        //const { coid, userid } = req.mySession;
        const { userId, coid } = req.params
        if (typeof userId === 'undefined' || userId === '') {
            return new CustomeMessage(req, res).error(400, 'userId is Required')
        }
        if (typeof coid === 'undefined' || coid === '') {
            return new CustomeMessage(req, res).error(400, 'coId is Required')
        }

        DBW.setStat({ table: 'gmuser', where: { userId, coid } })
        DBW.selectQB();

        const { rowCount } = await DBW.rowQB();

        if (rowCount == 0) {
            return new CustomeMessage(req, res).error(404, 'Failed! Data not exists')
        }
        DBW.deleteQB();
        return DBW.cmdQB()



    }


    // start tampil all
    async tampils(req, res) {
        const DBW = new DBWraper({ req, res })
        await DBW.setStat({ table: 'gmuser' })
        await DBW.selectQB();
        return (DBW.cmdQB());

    }

    async tampilcoid(req, res) {
        const DBW = new DBWraper({ req, res })
        const { coid } = req.params;

        await DBW.setStat({ table: 'gmuser', where: { coid } })


        await DBW.selectQB();
        return (DBW.cmdQB());

    }
    // start tampil satu
    async tampil(req, res) {
        const DBW = new DBWraper({ req, res });
        const { coid, userId } = req.params;

        DBW.setStat({ table: 'gmuser', where: { coid, userId } })
        DBW.selectQB();
        const { rowCount, rows } = await DBW.rowQB();

        if (rowCount == 0) {
            return new CustomeMessage(req, res).error(404, 'Failed! Data not exists')
        }

        return DBW.cmdQB();



    }

    // start aut
    async auth(req, res) {
        const { jwt } = this
        const DBW = new DBWraper({ req, res });

        const { coid, userId, userPassword } = req.body
        if (typeof userId === 'undefined' || userId === '') {
            return new CustomeMessage(req, res).error(400, 'userId is Required')
        }
        if (typeof coid === 'undefined' || userId === '') {
            return new CustomeMessage(req, res).error(400, 'coid is Required')
        }
        if (typeof userPassword === 'undefined' || userId === '') {
            return new CustomeMessage(req, res).error(400, 'User Password is Required')
        }

        DBW.setStat({ table: 'gmparam', where: { coid, modul: "general", code: 'user' } })
        DBW.selectQB();
        const paramCek = (await DBW.rowQB()).rows[0].param;


        DBW.setStat({ table: 'gmuser', where: { coid, userId } })
        DBW.selectQB();
        const { rowCount, rows } = await DBW.rowQB();


        const [userCek] = rows
        if (rowCount == 0) {
            return new CustomeMessage(req, res).error(404, 'Failed! User not exists')
        }

        if ((userCek.userstatus).toLowerCase() == 'disable') {
            return new CustomeMessage(req, res).error(404, 'Failed! User is Disabled')
        }

        // cek block time
        if (new Date() <= new Date(userCek.userblock) && userCek.userblock != '') {
            let cmd = `update gmuser set usertry=0 where lower(coid)=lower($1) and lower(userid)=lower($2)`
            let arr = [coid, userId];
            await DBW.setCmd({ cmd, arr });
            await DBW.rowQB();
            return new CustomeMessage(req, res).error(404, `Failed! User is blocked until ${userCek.userblock}`)
        }

        const validPass = await bcrypt.compare(userPassword, userCek.userpassword);

        if (!validPass) {
            let cmd, arr
            const usertry = userCek.usertry + 1
            if (usertry >= paramCek.maxtry) {
                cmd = `update gmuser set usertry=${usertry}
                ,userstatus='Blocked'
                ,userblock=to_char((now()+(${paramCek.blocktime * 0 + 1}*interval '1 minute'))::timestamp, 'YYYY-MM-DD HH24:MI') where lower(coid)=lower($1) and lower(userid)=lower($2)`
                arr = [coid, userId];
            }
            else {
                cmd = `update gmuser set usertry=${usertry}  where lower(coid)=lower($1) and lower(userid)=lower($2)`
                arr = [coid, userId];
            }

            await DBW.setCmd({ cmd, arr });
            await DBW.rowQB();
            return new CustomeMessage(req, res).error(400, 'Invalid Password')
        }


        try {
            const tokenId = jwt.createToken({ coid, userId })
            if (userCek.usertry != 0 || userCek.userstatus == 'Blocked' || userCek.userblock != '') {
                await DBW.setStat({ table: 'gmuser', field: { usertry: 0, userblock: '', userstatus: 'Active' }, where: { coid, userId }, res, req })
                await DBW.updateQB();
                await DBW.rowQB();
            }
            return new CustomeMessage(req, res).success(200, { message: 'Successfull!', tokenId })
        }
        catch (err) {
            return new CustomeMessage(req, res).error(400, err.message)
        }
    }


    // start UBAH
    async ubah(req, res) {
        const DBW = new DBWraper({ req, res });
        const { coid } = req.mySession;
        const { userId, userName, userPassword, userGroup, userMail, userStatus } = req.body
        const salt = await bcrypt.genSalt(10);
        let pwdEncrypt;
        if (typeof userPassword !== 'undefined') {

            pwdEncrypt = await bcrypt.hash(userPassword, salt);
        }

        if (typeof userId === 'undefined' || userId === '') {
            return new CustomeMessage(req, res).error(400, 'userId is Required')
        }


        DBW.setStat({ table: 'gmuser', where: { coid, userId } })
        DBW.selectQB();
        const user = (await DBW.rowQB()).rowCount;

        if (user == 0) {
            return new CustomeMessage(req, res).error(409, 'Failed! Data not exists in database')
        }

        await DBW.setStat({ table: 'gmuser', where: { coid, userId }, field: { userName, userPassword: pwdEncrypt, userGroup, userMail, userStatus } })
        await DBW.updateQB()

        return (await DBW.cmdQB())

        //return res.send('a')

    }

}

module.exports = { User }
