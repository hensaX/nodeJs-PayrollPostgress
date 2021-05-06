const { pool } = require('./../configs/ConnPg')
const { CustomeMessage } = require('./../app/helpers/customeMessage')
const dotenv = require('dotenv');
dotenv.config();

class DBWraper {

    constructor({ ...params }) {
        this.table = (typeof params.table === 'undefined') ? '' : params.table;
        this.field = (typeof params.field === 'undefined') ? [] : params.field;
        this.where = (typeof params.where === 'undefined') ? {} : params.where;
        this.res = (typeof params.res === 'undefined') ? {} : params.res;
        this.req = (typeof params.req === 'undefined') ? {} : params.req;
        this.myQuery = (typeof params.myQuery === 'undefined') ? {} : params.myQuery;

    }

    setStat({ ...params }) {
        this.table = (typeof params.table === 'undefined') ? '' : params.table;
        this.field = (typeof params.field === 'undefined') ? [] : params.field;
        this.where = (typeof params.where === 'undefined') ? {} : params.where;
        this.res = (typeof params.res === 'undefined') ? {} : params.res;
        this.req = (typeof params.req === 'undefined') ? {} : params.req;
    }
    getCmd() {
        return (this.myQuery)
    }

    cmdQB(params) {
        //console.log('$$$')
        const { myQuery, res, req } = (typeof params === 'undefined') ? this : params;
        myQuery.cmd.toLowerCase()
        return (
            pool.query(myQuery.cmd, myQuery.arr)
                .then(r => new CustomeMessage(req, res).success(200, { message: `Succesfull ${r.command} # ${r.rowCount} records`, data: r.rows }))
                .catch(err => new CustomeMessage(req, res).error(400, { message: err }))
                .finally((process.env.SHOW_CONSOLE_LOG == 1) ? console.log(myQuery) : '')
        )
    }
    rowQB(params) {
        const { myQuery, res, req } = (typeof params === 'undefined') ? this : params;
        //console.log(params)
        myQuery.cmd.toLowerCase()
        return (
            pool.query(myQuery.cmd, myQuery.arr)
                .then(r => ({ rows: r.rows, rowCount: r.rowCount }))
                .catch(err => new CustomeMessage(req, res).error(400, { err }))
                .finally((process.env.SHOW_CONSOLE_LOG == 1) ? console.log(myQuery) : '')
        )
    }

    whereCek(where) {
        // isi kondisi where nya
        let kondisi = '';
        let arr = [];
        let arrlen = 0;

        if (typeof where === 'undefined' || Object.keys(where).length == 0) {
            kondisi = ''
        } else { kondisi = ' where ' }


        Object.entries(where).forEach(
            ([key, val], i) => {
                i++
                if (typeof val !== 'undefined') {
                    arrlen++;
                    kondisi = kondisi + `lower(${key})=lower($${arrlen})${((Object.entries(where)).length == i) ? ' ' : ' and '
                        }`;
                    arr.push(val);
                }
                else { return new CustomeMessage(this.req, this.res).error(400, "Where statement is undefined") };

            }
        )

        //kondisi = kondisi.substring(0, kondisi.length - 1);
        kondisi = kondisi.toLowerCase()

        return { kondisi, arr };

    }

    fieldCek(field) {
        // isi kondisi fieldnya
        let kolom = '';

        if (typeof field === 'string') {
            kolom = field;

        }
        else {
            if (Object.keys(field).length != 0) {
                (Object.keys(field)).forEach((a, i) => {
                    i++;
                    kolom = kolom + a + ((i == Object.keys(field).length) ? '' : ',');
                })
            }
            else { kolom = '*' };
        };


        kolom = kolom.toLowerCase();
        return kolom;

    }



    selectQB() {
        const { table, field, where } = this

        const { kondisi, arr } = this.whereCek(where)
        const kolom = this.fieldCek(field)
        let cmd = `select ${kolom} from ${table} ${kondisi} `
        let myQuery = { cmd, arr };
        return (this.myQuery = myQuery)
    }


    deleteQB() {
        const { table, where } = this

        const { kondisi, arr } = this.whereCek(where)

        //kondisi where array querynyanya
        let cmd = `delete from ${table} ${kondisi} `
        let myQuery = {
            cmd, arr
        };

        return (this.myQuery = myQuery)

    }


    updateQB() {

        const { table, field, where } = this

        let kondisi = this.whereCek(where)
        // isi kondisi fieldnya
        console.log('###')
        console.log(field)
        let kolom = '';
        let kolomlen = kondisi.arr.length;
        let kolomarr = [...kondisi.arr];
        Object.entries(field).forEach(
            ([key, val], i) => {
                i++
                if (typeof val !== 'undefined') {
                    kolomlen++;
                    kolom = kolom + `${key}=$${kolomlen},`;
                    kolomarr.push(val);
                };

            }
        )
        kolom = kolom.substring(0, kolom.length - 1);
        kolom = kolom.toLowerCase();

        const arr = [...kolomarr]
        let cmd = `update ${table} set ${kolom} ${kondisi.kondisi} `

        let myQuery = { cmd, arr };
        //console.log(cmd)

        return (this.myQuery = myQuery)


    }


    insertQB() {

        const { table, field, where } = this
        let kondisi = this.whereCek(where)
        let kolomlen = kondisi.arr.length;
        //isi field field nya
        let isi = '';
        let kolom = '';
        if (typeof field === 'undefined' || Object.keys(field).length == 0) {
            console.log('kolom tidak boleh kosong om')
        }

        Object.keys(field).forEach(
            (a, i) => {
                kolomlen++;
                i++;
                kolom = kolom + a + ((i == Object.entries(field).length) ? '' : ',');
                isi = isi + `$${kolomlen} ` + ((i == Object.keys(field).length) ? '' : ',');
            }
        )

        //isi field array querynyanya
        kolom = kolom.toLowerCase();
        isi = isi.toLowerCase();
        let cmd = `insert into ${table} (${kolom}) values(${isi}) ${kondisi.kondisi}; `
        const arr = [...kondisi.arr, ...(Object.values(field))]
        let myQuery = { cmd, arr };

        return this.myQuery = myQuery;


        // cara execnya
        //insertGw('userid', { username: 'hendra', password: '123' }, ['user_id', 'username', 'email']);

    }

}



module.exports = { DBWraper }