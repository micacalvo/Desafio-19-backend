import { logError, logInfo } from '../../../loggers/loggers.js';
import ContenedorMongodb from '../../contenedores/ContenedorMongodb.js';
import ProductosModel from '../../ProductosModel.js';

class ProductosDao extends ContenedorMongodb {
  constructor() {
    super(ProductosModel);
    this.contenedor = ContenedorMongodb.getInstance();
    this.contenedor.conectarDB();
  }

  async buscarProductosPorPrecio(precio) {
    try {
      const productos = await ProductosModel.find({ price: precio });
      logInfo(productos);
      return productos;
    } catch (error) {
      logError('Error al encontrar el producto por el precio', error);
      throw error;
    }
  }
}

export default ProductosDao;
