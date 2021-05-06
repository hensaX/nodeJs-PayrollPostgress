const { response } = require('express');
const express = require('express');
const { jwt } = require('jsonwebtoken');
const app = express();
const { tglCantik, convertTZ } = require('./app/libs/allFunction');


console.log('========================================')
let a = {
    command: 'SELECT',
    rows: [
        {
            coid: 'DMO',
            empid: 'TES2',
            empnm: 'hendra sanusi',
            hiredt: '2021-04-06',
            birthdt: '',
            privatemail: 'hendra.sanusi.gmail.com',
            officemail: 'hendra@office.com',
            gender: 'laki-laki',
            blood: 'A',
            religion: 'Islam',
            citizen: 'WNI',
            homeaddr: 'Depok',
            resigndt: '',
            atstart: '2021-04-06',
            pystart: '2021-05-01',
            loged: {}
        }
    ],
    rowCount: 1,
    cMsg: function () { return `Succesfull ${this.command} # ${this.rowCount} records` }
}



console.log(x)
console.log(a)


console.log('========================================')
//app.listen(3000, () => console.log(`serverDev is running, port : ${3000}`));

