import cluster from 'cluster';
import config from './config/config.js'

import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import passport from 'passport'

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

function server(){

// instancio servidor, socket , api y passport
const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

// configuro el socket

io.on('connection', async socket => {
    // console.log('Nuevo cliente conectado!');
    addProductosHandlers(socket, io.sockets)
    addMensajesHandlers(socket, io.sockets)
});

// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')))
app.use(compression())

app.set('view engine', 'ejs');

app.use(cookieParser())
// app.use(objectUtils.createOnMongoStore())
app.use(session(config.session))

app.use(passport.initialize())
app.use(passport.session())

// MIDDLEWARE PASSPORT
app.use(passport.initialize())
app.use(passport.session())

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

