const { Module } = require('./Module')

class Connection extends Module {
    constructor() {
        super()
        this.db = this.mongoose()
    }
    async MongooseConnection() {
        const { db } = this
        const connection = await db.connect(process.env.DB_CONNECT, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })

        if (!connection) return console.log('Database Connection Failed')
        return console.log('Database Connection Successfuly')
    }
}

module.exports = { Connection }
