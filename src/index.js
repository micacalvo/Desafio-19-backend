<<<<<<< HEAD
import cluster from 'cluster';
import config from './config/config.js'

=======
//Testing
import ProductosController from './controllers/productos.controller.js'
import {api} from './api/productos.js'
import express from 'express';
import session from 'express-session';
import mongoSession from './models/contenedores/ContenedorSession.js';
import passport from 'passport';

import {Server as HTTPServer} from 'http';
import {Server as IOServer} from 'socket.io';

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import productosApi from './router/api/productosApi.js';
import processApi from './router/api/processApi.js'

//Rutas web
import productosWebRouter from './router/web/home.js';
import profileWebRouter from './router/web/profile.js';
import cartWebRouter from './router/web/cart.js';
import authWebRouter from './router/web/auth.js';
import infoWebRouter from './router/web/info.js'

//Rutas web-socket
import productsWs from "./router/web-socket/home.js"
import cartWs from "./router/web-socket/cart.js"

//Compression
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37
import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import passport from 'passport'

<<<<<<< HEAD
import { logInfo, logWarning } from '../src/loggers/loggers.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import productosApiRouter from '../src/router/api/productosApi.js'
import randomsApiRouter from '../src/router/api/processApi.js'
import authWebRouter from '../src/router/web/auth.js'
import homeWebRouter from '../src/router/web/home.js'
import infoWebRouter from '../src/router/web/info.js'

import addMensajesHandlers from '../src/router/web-socket/mensajes.js'
import addProductosHandlers from '../src/router/web-socket/productos.js'

import ProductosController from '../src/controllers/Productos.controller.js'
import auth from '../src/router/web/auth.js'
import {api} from '../src/api/productos.js'
import { graphqlHTTP } from 'express-graphql'
import ProductosSchema from '../src/graphql/schema.js'
import { obtenerProducto, obtenerProductos, eliminarProducto, agregarProducto, actualizarProducto } from '../src/graphql/resolvers.js'

=======
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37
function server(){

// instancio servidor, socket , api y passport
const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

// configuro el socket

io.on('connection', async socket => {
<<<<<<< HEAD
    // console.log('Nuevo cliente conectado!');
    addProductosHandlers(socket, io.sockets)
    addMensajesHandlers(socket, io.sockets)
=======
    productsWs(socket);
    cartWs(socket);
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37
});

// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')))
app.use(compression())

<<<<<<< HEAD
app.set('view engine', 'ejs');

app.use(cookieParser())
// app.use(objectUtils.createOnMongoStore())
app.use(session(config.session))
=======
app.set("view engine", "ejs");

//Middleware session
app.use(session(mongoSession))
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37

app.use(passport.initialize())
app.use(passport.session())

// MIDDLEWARE PASSPORT
app.use(passport.initialize())
app.use(passport.session())

<<<<<<< HEAD
const sessions = auth
app.use('/api/sessions', sessions)
//req.session.passport.user

// rutas del servidor API REST

app.use(productosApiRouter)
app.use(randomsApiRouter)

// rutas del servidor web
app.use(authWebRouter)
app.use(homeWebRouter)
app.use(infoWebRouter)

// logging casos no manejados
app.use('*', (req, res, next) => {
    logWarning(`${req.method} ${req.originalUrl} - ruta inexistente!`)
        next()
=======
//Rutas del servidor web
app.use(productosWebRouter)
//app.use(cartWebRouter)
app.use(authWebRouter)
app.use(profileWebRouter)
app.use(productosWebRouter)
app.get('*', (req, res) => {
    res.redirect('/login')
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37
})

// logging general
app.use((req, res, next) => {
    logInfo(`${req.method} ${req.url}`)
    next()
})

// Test DTO
app.get('/test', async (req, res) => {
    const docs = await ProductosController.listarAllCotizaciones();
    res.json(docs)
})

<<<<<<< HEAD
// Test MOCHA API
app.use('/apiProductos', api)

//  Api Rest con GraphQL
app.use('/graphql', graphqlHTTP({
    schema: ProductosSchema,
    rootValue: {
        obtenerProducto, 
        obtenerProductos, 
        eliminarProducto, 
        agregarProducto,
        actualizarProducto},
    graphiql: true,
}))

=======
// Test DTO
app.get('/test', async (req, res) => {
    const docs = await ProductosController.listarAllCotizaciones();
    res.json(docs)
})

// Test MOCHA API
app.use('/apiProductos', api)

>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37
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

