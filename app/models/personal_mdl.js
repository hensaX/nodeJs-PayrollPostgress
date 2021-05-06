const { Module } = require('../../configs/Module')
const mongoose = new Module().mongoose()

const personalSchema = new mongoose.Schema({
    employeId: {
        type: String,
        required: [true, 'Employee Id Id is Required'],
        trim: true,
        minlength: 1,
        maxlength: 255

    },
    employeName: {
        type: String,
        required: [true, 'Employee Name is Required'],
        trim: true,
        minlength: 1,
        maxlength: 255

    },
    joinDate: {
        type: String,
        required: [true, 'Join Date is Required'],
        trim: true,
        minlength: 1,
        maxlength: 10
    },
    joinDate: {
        type: String,
        required: [true, 'Join Date is Required'],
        trim: true,
        minlength: 1,
        maxlength: 10
    },
    birthDate: {
        type: String,
        required: [true, 'Birth Date is Required'],
        trim: true,
        minlength: 1,
        maxlength: 10
    },
    birthPlace: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 255
    },
    eMail: {
        private: {
            type: String,
            required: [true, 'Name Id is Required'],
            trim: true,
            minlength: 1,
            maxlength: 255,
            match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please give a valid email address']
        },
        office: {
            type: String,
            trim: true,
            maxlength: 255,
            match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please give a valid email address']
        }
    },
    homeAddress: {
        type: String,
        trim: true,
        maxlength: 255,
    },
    blood: {
        type: String,
        trim: true,
        maxlength: 10,
    },
    gender: {
        type: String,
        trim: true,
        maxlength: 10,
    },
    weight: {
        type: Number
    },
    religion: {
        type: Number
    },
    officialData: {
        hirarki: {
            refNo: {
                type: String,
                trim: true,
                maxlength: 255,
            },
            date: {
                type: String,
                trim: true,
                maxlength: 10,
            },
            code: {
                type: String,
                trim: true,
                maxlength: 255,
            }
        },
        title: {
            refNo: {
                type: String,
                trim: true,
                maxlength: 255,
            },
            date: {
                type: String,
                trim: true,
                maxlength: 10,
            },
            code: {
                type: String,
                trim: true,
                maxlength: 255,
            }
        },
        grade: {
            refNo: {
                type: String,
                trim: true,
                maxlength: 255,
            },
            date: {
                type: String,
                trim: true,
                maxlength: 10,
            },
            code: {
                type: String,
                trim: true,
                maxlength: 255,
            }
        },
        class: {
            refNo: {
                type: String,
                trim: true,
                maxlength: 255,
            },
            date: {
                type: String,
                trim: true,
                maxlength: 10,
            },
            code: {
                type: String,
                trim: true,
                maxlength: 255,
            }
        },
        type: {
            refNo: {
                type: String,
                trim: true,
                maxlength: 255,
            },
            date: {
                type: String,
                trim: true,
                maxlength: 10,
            },
            code: {
                type: String,
                trim: true,
                maxlength: 255,
            }
        },
        location: {
            refNo: {
                type: String,
                trim: true,
                maxlength: 255,
            },
            date: {
                type: String,
                trim: true,
                maxlength: 10,
            },
            code: {
                type: String,
                trim: true,
                maxlength: 255,
            }
        }
    },
    bpjsId: {
        cardType: {
            type: String,
            trim: true,
            maxlength: 255,
        },
        cardId: {
            type: String,
            trim: true,
            maxlength: 255,
        },
        date: {
            type: String,
            trim: true,
            maxlength: 10,
        },
        notes: {
            type: String,
            trim: true,
            maxlength: 255,
        }
    },
    cardId: {
        cardType: {
            type: String,
            trim: true,
            maxlength: 255,
        },
        cardId: {
            type: String,
            trim: true,
            maxlength: 255,
        },
        startCard: {
            type: String,
            trim: true,
            maxlength: 10,
        },
        EndCard: {
            type: String,
            trim: true,
            maxlength: 10,
        },
        cardAddres: {
            type: String,
            trim: true,
            maxlength: 255,
        },
        cardNotes: {
            type: String,
            trim: true,
            maxlength: 255,
        }
    },
    log: {
        user: {
            type: String,
            maxlength: 255,
        },
        updateDate: {
            type: Date,
            default: Date.now
        }
    }
}, { collection: 'pesonalmaster' });

let personalSchema = mongoose.model('personalSchema', userSchema)
module.exports = { personalSchema }
