import mongoose from 'mongoose';
import usuariosSchema from '../../esquemas/usuariosSchema.js';
import bcrypt from '../bcrypt/bcrypt.js';

class Session {
    constructor() {
    this.url = 'mongodb+srv://micaela:micaela@cluster0.m1b6gix.mongodb.net/micadb'
    this.mongodb = mongoose.connect
    }

    //Funciones
    async conectarDB() {
    await this.mongodb(this.url)
    }

    async buscarUsuarioEmail(email) {
    await this.conectarDB()
    const usuario = await usuariosSchema.findOne({email})
    return usuario
    }

    async registrarUsuario(usuario) {
    await this.conectarDB()
    const userExist = await usuariosSchema.findOne({email: usuario.email})
    if (userExist) return false
    usuario.password = bcrypt.createHash(usuario.password)
    const newUser = new usuariosSchema(usuario)
    await newUser.save()
    return true
    }
}

export default Session