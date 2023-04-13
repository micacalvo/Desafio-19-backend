import CustomError from "./CustomError.class.js";

class DBClient {
<<<<<<< HEAD
    async connect(){
        throw new CustomError(500, "Falta implementar", "method 'connect' en Sub Clase")
    }

    async disconnect(){
=======
    async connect() {
        throw new CustomError(500, "Falta implementar", "method 'connect' en Sub Clase")
    }

    async disconnect() {
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37
        throw new CustomError(500, "Falta implementar", "method 'disconnect' en Sub Clase")
    }
}

export default DBClient;