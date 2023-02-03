import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import {Server as HTTPServer} from 'http';
import {Server as IOServer} from 'socket.io';
//import util from 'util';
import cookieParser from 'cookie-parser';
import passport from 'passport';
//import path from 'path'; //Para poder usar los archivos de las vistas, accede a las rutas absolutas
import dotenv from 'dotenv';

import productosApi from './router/api/productosApi.js';
import authWebRouter from './router/web/auth.js';
import productosWebRouter from './router/web/home.js';
import mensajesApi from './router/web-socket/mensajes.js';
dotenv.config();

//Instancio servidor
const app = express()

//Instancio el socket
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

//Configuro el socket

io.on('connection', async socket => {
    productosApi(socket, io.sockets)
    mensajesApi(socket, io.sockets)
});

//Inicializo passport
app.use(passport.initialize())

//Middlewares
app.use(express.json()) //Porque trabajo con formularios
app.use(express.urlencoded({extended: true})) //Para postman
app.use(express.static('public'))

app.use(session({
    store: MongoStore.create({mongoUrl: 'mongodb://0.0.0.0:27017/dbmica'}),
    secret: 'abcd',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 50000
    }
}))

app.use(cookieParser())
//app.use(util.createOnMongoStore())

// Middleware Passport
app.use(passport.initialize())
app.use(passport.session())

//Session
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 20000 //20sg
    }
}))

app.use('/api/sessions', session)
//req.session.passport.user

// Rutas del servidor API REST
app.use(productosApi)

//Rutas del servidor web
app.use(authWebRouter)
app.use(productosWebRouter)

//Servidor
const PORT = process.env.PORT
const server = httpServer.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

server.on('error', error => console.log(`Error ${error}`))



