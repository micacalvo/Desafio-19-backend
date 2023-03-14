import ContenedorMongodb from "../../contenedores/ContenedorMongodb.js";

class CarritosDaoMongodb extends ContenedorMongodb {
    constructor () {
        super('carritos', {
            total: { type: Number , required: true },
            productos: { type: [], required: true },
            user: {type: String, required: true}
        })
    }
}

export default CarritosDaoMongodb