import ContenedorMongodb from "../../contenedores/ContenedorMongodb.js"
import productSchema from "../../schemas/productSchema.js"

class ProductosDaoMongodb extends ContenedorMongodb {
    constructor (){
        super(productSchema)
    }
}

export default ProductosDaoMongodb
