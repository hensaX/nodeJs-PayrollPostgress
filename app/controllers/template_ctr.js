const { Jwt } = require('../libs/jwt')
const bcrypt = require('bcrypt');
const { pool } = require('../../configs/ConnPg');
const { DBWraper } = require('../../core/DBWraper');
const { CustomeMessage } = require('../helpers/customeMessage');

class pn0010 {
    constructor() {
        this.jwt = new Jwt();
    }


    // start tambah
    async tambah(req, res) {
        const DBW = new DBWraper({ req, res })
        const { coid, userid } = req.mySession;
        const { empid, empnm, hiredt, privatemail, officemail, gender, blood, religion, citizen, homeaddr, resigndt, atstart, pystart } = req.body;
        await DBW.setStat({ table: 'pnmaster', where: { coid, empid } })
        await DBW.selectQB();
        const { rowCount } = (await DBW.rowQB());

        if (rowCount == 1) {
            return new CustomeMessage(req, res).error(409, 'Failed! Data already exists in database')
        }


        await DBW.setStat({ table: 'pnmaster', field: { coid, empid, empnm, hiredt, privatemail, officemail, gender, blood, religion, citizen, homeaddr, resigndt, atstart, pystart } })
        await DBW.insertQB();
        return (await DBW.cmdQB())



    }
    async hapus(req, res) {
        const DBW = new DBWraper({ req, res })
        const { coid, userid } = req.mySession;
        const { empid } = req.body;
        await DBW.setStat({ table: 'pnmaster', where: { coid, empid } })
        await DBW.selectQB();
        const { rowCount } = (await DBW.rowQB());

        if (rowCount == 0) {
            return new CustomeMessage(req, res).error(409, 'Failed! Data not exists in database')
        }


        await DBW.setStat({ table: 'pnmaster', where: { coid, empid } })
        await DBW.deleteQB();
        return (await DBW.cmdQB())


    }

    async ubah(req, res) {
        const DBW = new DBWraper({ req, res });
        const { coid, userid } = req.mySession;
        const { empid, empnm, hiredt, privatemail, officemail, gender, blood, religion, citizen, homeaddr, resigndt, atstart, pystart } = req.body;
        await DBW.setStat({ table: 'pnmaster', where: { coid, empid } })
        await DBW.selectQB();
        const { rowCount } = (await DBW.rowQB());

        if (rowCount == 0) {
            return new CustomeMessage(req, res).error(409, 'Failed! Data not exists in database')
        }

        await DBW.setStat({ table: 'pnmaster', where: { coid, empid }, field: { coid, empid, empnm, hiredt, privatemail, officemail, gender, blood, religion, citizen, homeaddr, resigndt, atstart, pystart } })
        await DBW.updateQB();
        return (await DBW.cmdQB())

    }

    async tampil(req, res) {
        const DBW = new DBWraper({ req, res })
        const { coid, userid } = req.mySession;
        const { empid } = req.body;
        await DBW.setStat({ table: 'pnmaster', where: { coid } })
        await DBW.selectQB();
        const { rowCount } = (await DBW.rowQB());

        if (rowCount == 0) {
            return new CustomeMessage(req, res).error(409, 'Failed! Data not exists in database')
        }

        return (await DBW.cmdQB())

    }

    async tampils(req, res) {
        const DBW = new DBWraper({ req, res })
        const { coid, userid } = req.mySession;
        const { empid } = req.body;
        await DBW.setStat({ table: 'pnmaster', where: { coid, empid } })
        await DBW.selectQB();
        const { rowCount } = (await DBW.rowQB());

        if (rowCount == 0) {
            return new CustomeMessage(req, res).error(409, 'Failed! Data not exists in database')
        }

        return (await DBW.cmdQB())

    }

}

module.exports = { pn0010 }
