import express from 'express';
import session from 'express-session';
import passport from 'passport';

import {Server as HTTPServer} from 'http';
import {Server as IOServer} from 'socket.io';

import config from './config.js'

import productosApi from './router/api/productosApi.js';
import processApi from './router/api/processApi.js'

import authWebRouter from './router/web/auth.js';
import productosWebRouter from './router/web/home.js';
import mensajes from './router/web-socket/mensajes.js';
import productos from './router/web-socket/productos.js'

//Compression
import compression from 'compression'

//Loggers
import { logInfo, logError, logWarning } from './loggers/loggers.js'

function server(){
//Instancio servidor
const app = express()

//Instancio el socket y API
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

//Configuro el socket
io.on('connection', async socket => {
    productos(socket, io.sockets)
    mensajes(socket, io.sockets)
});

//Middlewares
app.use(express.json()) //Porque trabajo con formularios
app.use(express.urlencoded({extended: true})) //Para postman
app.use(express.static('public'))

app.use(session(config.session))
/* app.use(cookieParser())
app.use(bcrypt.createOnMongoStore())
 */
// Middleware Passport
app.use(passport.initialize())
app.use(passport.session())

// Rutas del servidor API REST
app.use(productosApi)
app.use(processApi)

//Rutas del servidor web
app.use(authWebRouter)
app.use(productosWebRouter)

//Configuración de compression
app.use(compression())

//Configuración de loggers
//Logging general(Es el de info)
app.use((req, res, next) => {
    logInfo(`${req.method} ${req.url}`)
    next()
})

//Logging de warning cuando la ruta no existe (* -> ruta random)
app.use('*', (req, res, next) => {
    logWarning(`${req.method} ${req.originalUrl} - Ruta inexistente`)
    next()
})

return {
    listen: port => new Promise((resolve, reject) => {
        const connectedServer = httpServer.listen(port, () => {
            resolve(connectedServer)
        })
        connectedServer.on('error', error => {
            reject(error)
        })
    })
}
}

export {server}
