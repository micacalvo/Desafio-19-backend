import express from 'express';
import session from 'express-session';
import mongoSession from './models/contenedores/ContenedorSession.js';
import passport from 'passport';

import {Server as HTTPServer} from 'http';
import {Server as IOServer} from 'socket.io';

import productosApi from './router/api/productosApi.js';
import processApi from './router/api/processApi.js'

//Rutas web
import homeWebRouter from './router/web/home.js';
import profileWebRouter from './router/web/profile.js';
import cartWebRouter from './router/web/cart.js';
import authWebRouter from './router/web/auth.js';

//Rutas web-socket
import productsWs from "./router/web-socket/home.js"
import cartWs from "./router/web-socket/cart.js"

//Compression
import compression from 'compression'

function server(){
//Instancio servidor
const app = express()

//Instancio el socket y API
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

//Configuro el socket
io.on('connection', async socket => {
    productsWs(socket);
    cartWs(socket);
});

//Middlewares
app.use(express.json()) //Porque trabajo con formularios
app.use(express.urlencoded({extended: true})) //Para postman
app.use(express.static('public'))

app.set("view engine", "ejs");
app.set("views", "./views");

//Middleware session
app.use(session(mongoSession))

// Middleware Passport
app.use(passport.initialize())
app.use(passport.session())

// Rutas del servidor API REST
app.use(productosApi)
app.use(processApi)

//Rutas del servidor web
app.use(homeWebRouter)
app.use(cartWebRouter)
app.use(authWebRouter)
app.use(profileWebRouter)
app.get('*', (req, res) => {
    res.redirect('/login')
})

//Configuración de compression
app.use(compression())

//Configuración de loggers
//Logging general(Es el de info)
/* app.use((req, res, next) => {
    logInfo(`${req.method} ${req.url}`)
    next()
})

//Logging de warning cuando la ruta no existe (* -> ruta random)
app.use('*', (req, res, next) => {
    logWarning(`${req.method} ${req.originalUrl} - Ruta inexistente`)
    next()
})
 */
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
