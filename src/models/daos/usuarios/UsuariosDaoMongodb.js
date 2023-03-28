import ContenedorMongodb from "../../contenedores/ContenedorMongodb.js";
import userSchema from "../../schemas/userSchema.js"

class UsuariosDaoMongodb extends ContenedorMongodb{
    constructor (){
        super(userSchema)
    }
}

export default UsuariosDaoMongodb