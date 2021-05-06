require('module-alias/register')
const cluster = require('cluster')
const os = require('os')
const http = require('http')
const { app } = require('./app')
const { Route } = require('./core/Route')



class myServer extends Route {
    initServer() {
        if (cluster.isMaster) {
            let cpuCore = os.cpus().length
            for (let i = 0; i < cpuCore; i++) {
                cluster.fork()
            }
            cluster.on('online', (worker) => {
                if (worker.isConnected()) console.log(`worker is active ${worker.process.pid}`)
            })

            cluster.on('exit', (worker) => {
                if (worker.isDead()) console.log(`worker is dead ${worker.process.pid}`)
                cluster.fork()
            })
        } else {
            app.use('/api', super.appInit())
            app.listen(process.env.HOST_PORT, () => console.log(`server is running, port : ${process.env.HOST_PORT}`));
        }
    }
    initDevServer() {
        app.use('/api', super.appInit())
        app.listen(process.env.HOST_PORT, () => console.log(`serverDev is running, port : ${process.env.HOST_PORT}`));
    }
}

if (process.env.ENVIRONMENT === 'DEV') {
    new myServer().initDevServer();
}
else {
    new myServer().initServer();
}