//Contenedor para guardar los productos
import mongoose from "mongoose";
//import transformMongoObject from '../auth/objectUtil.js'
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
        
    async save(producto) {
        try {
         const prod = new this.collection(producto)
         const prodSave = await prod.save();
         return prodSave
        } catch (error) {
         logError("Error")
        } 
     }
 
    async getAll() {
        try {
            const data = await this.collection.find({})
            return data
        }
        catch (error) {
            logError(error)
        }
    }

    async getById(id) {
        try {
            const data = await this.collection.find({'_id': id})
            if(data){
                return data
            } else {
                return ('No se encontro')
           }} 
           catch (error) {
            logError(error)
        }
}

    async updateById(id, item) {
        try {
            const updateProd = await this.collection.updateOne({_id: id}, {$set: item})
            return (updateProd)
        } catch (error) {
            logError(error)
        }
    }

    async deleteById(id) {
        try {
            const deletedProd = await this.collection.deleteOne({_id:id})
            return deletedProd   
        } catch (error) {
            logError(error)
        }
    }

    async deleteAll() {
        try {
            const data = await this.collection.deleteMany({})
            return data    
        } catch (error) {
            logError(error)
        }
    }
}

export default ContenedorMongodb