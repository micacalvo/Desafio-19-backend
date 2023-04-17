import Cotizador from '../classes/Cotizador.class.js';
import ProductoDTO from '../classes/ProductoDTO.class.js';
import ProductosDAO from '../models/daos/productos/ProductosDaoMongodb.js';

const PrdDAO = new ProductosDAO();
const cot = new Cotizador();

const ProductosController = {
  async save(elemento) {
    return await PrdDAO.save(elemento);
  },

  async getAll() {
    return await PrdDAO.getAll();
  },

  async getById(id) {
    return await PrdDAO.getById(id);
  },

  async getAllCotizaciones() {
    const docs = await PrdDAO.getAll();
    const docsDto = docs.map((producto) => {
      const cotizaciones = {
        precioDolar: cot.getPrecioSegunMoneda(producto.price, 'USD'),
        precioARS: cot.getPrecioSegunMoneda(producto.price, 'ARS'),
        precioCOL: cot.getPrecioSegunMoneda(producto.price, 'COL'),
      };

      console.log(Object.entries(cotizaciones));

      return new ProductoDTO(producto, cotizaciones);
    });

    return docsDto;
  },
};

export default ProductosController;
