import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import {Server as HTTPServer} from 'http';
import {Server as IOServer} from 'socket.io';

import bcrypt from '../src/bcrypt/bcrypt.js';
//import path from 'path'; //Para poder usar los archivos de las vistas, accede a las rutas absolutas

import processRouter from '../src/router/api/processApi.js';
import dotenv from 'dotenv';
import {config} from './config.js'
dotenv.config();

import productosApi from './router/api/productosApi.js';
import processApi from './router/api/processApi.js'

import authWebRouter from './router/web/auth.js';
import productosWebRouter from './router/web/home.js';
import mensajes from './router/web-socket/mensajes.js';
import productos from './router/web-socket/productos.js'

//Instancio servidor
const app = express()

//Instancio el socket
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

app.use(cookieParser())
app.use(bcrypt.createOnMongoStore())

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
const sessions = authWebRouter
app.use('/api/sessions', sessions)
//req.session.passport.user

// Rutas del servidor API REST
app.use(productosApi)
app.use(processApi)

//Rutas del servidor web
app.use(authWebRouter)
app.use(productosWebRouter)

//Servidor
const server = httpServer.listen(config.PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

server.on('error', error => console.log(`Error ${error}`))



