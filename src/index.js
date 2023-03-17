import express from 'express';
import session from 'express-session';
import mongoSession from './contenedores/ContenedorSession.js';
import passport from 'passport';

import {Server as HTTPServer} from 'http';
import {Server as IOServer} from 'socket.io';

import productosApi from './router/api/productosApi.js';
import processApi from './router/api/processApi.js'

import productosWebRouter from './router/web/main.js';
import mensajes from './router/web-socket/mensajes.js';
import productos from './router/web-socket/productos.js'

//Rutas web
import {login} from './router/web/login.js'
import {register} from './router/web/register.js'
import {error} from './router/web/error.js'
import {main} from './router/web/main.js'
import {cart} from './router/web/cart.js'
import {logout} from './router/web/logout.js'

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

/* app.set('public', './public')
app.set('view engine', 'html')
 */
//Middleware session
app.use(session(mongoSession))

// Middleware Passport
app.use(passport.initialize())
app.use(passport.session())

// Rutas del servidor API REST
app.use(productosApi)
app.use(processApi)

//Rutas del servidor web
app.use(productosWebRouter)
app.use('/login', login)
app.use('/logout', logout)
app.use('/register', register)
app.use('/error', error)
app.use('/main', main)
app.use('/cart', cart)
app.get('*', (req, res) => {
    res.redirect('/login')
})

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
