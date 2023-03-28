import ContenedorMongodb from "../../contenedores/ContenedorMongodb.js";
import cartSchema from "../../schemas/cartSchema.js"

class CarritosDaoMongodb extends ContenedorMongodb {
    constructor (){
        super(cartSchema)
    }
}

export default CarritosDaoMongodb