import mongoose from 'mongoose';
import usuariosEsquema from '../esquemas/usuariosEsquema.js';
import util from '../funcionUtil/util.js';

class Session {
    constructor() {
    this.url = 'mongodb+srv://micaela:srbrisa1410@cluster0.m1b6gix.mongodb.net/?retryWrites=true&w=majority'
    this.mongodb = mongoose.connect
    }

    //Funciones
    async conectarDB() {
    await this.mongodb(this.url)
    }

    async buscarUsuarioEmail(email) {
    await this.conectarDB()
    const usuario = await usuariosEsquema.findOne({email})
    return usuario
    }

    async registrarUsuario(usuario) {
    await this.conectarDB()
    const userExist = await usuariosEsquema.findOne({email: usuario.email})
    if (userExist) return false
    usuario.password = util.createHash(usuario.password)
    const newUser = new usuariosEsquema(usuario)
    await newUser.save()
    return true
    }
}
export default Session