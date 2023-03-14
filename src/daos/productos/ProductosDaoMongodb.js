import ContenedorMongodb from "../../contenedores/ContenedorMongodb.js"

class ProductosDaoMongodb extends ContenedorMongodb {
    constructor() {
        super('productos', {
            producto: {type: String, required: true },
            precio: {type: Number, required: true },
            thumbnail: {type: String, required: true}
        })
    }
}
export default ProductosDaoMongodb
