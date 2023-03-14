//Contenedor para guardar los productos
import mongoose from "mongoose";
import transformMongoObject from '../auth/objectUtil.js'
import {urlMongo} from '../config.js'
import {logInfo, logError} from '../loggers/loggers.js'

await mongoose.connect(urlMongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
})
.then(() => logInfo('Base de datos mongo conectada'))
.catch(error => logError("Base de datos mongo no conectada"))

class ContenedorMongodb {
    constructor(nombreCollection, esquema) {
        this.collection = mongoose.model(nombreCollection, esquema)
    }
        
    async save(elemento) {
        try {
            const res = await this.collection.create(elemento)
            return transformMongoObject(res)
        } catch (error) {
            logError(error)
            return false
        } 
    }

    async getAll() {
        try {
            const res = await this.collection.find({})
            if (res.length == 0) {
                return res
            } else {
                return transformMongoObject(res)
            }
        } catch (error) {
            logError(error)
            return false
        }
    }

    async getById(id) {
        try {
            const res = await this.collection.find({ _id: id })
            return transformMongoObject(res)
        } catch (error) {
            logError(error)
            return false
        }
}

    async updateById(id, elemento) {
        try {
            const res = await this.collection.updateOne({ _id: id }, { $set: elemento })
            return res.acknowledged
        } catch (error) {
            logError(error)
            return false
        }
    }

    async deleteById(id) {
        try {
            const res = await this.collection.deleteOne({ _id: id })
            return res.acknowledged
        } catch (error) {
            logError(error)
            return false
        }
    }

    async deleteAll() {
        try {
            const res = await this.collection.deleteMany()
            return res.acknowledged
        } catch (error) {
            logError(error)
            return false
        }
    }
}

export default ContenedorMongodb