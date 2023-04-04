import { Router } from 'express';
import productosDAO from '../models/daos/productos/ProductosDaoMongodb.js';

export const api = Router();

const productosDao = new productosDAO();

api.get('/', async (req, res) => {
  const prods = await productosDao.getAll();

  res.send(prods);
});

api.get('/:id', async (req, res) => {
  const id = req.params.id;
  const prod = await productosDao.getById(id);

  res.send(prod);
});

api.post('/', async (req, res) => {
  const producto = req.body;
  const prod = await productosDao.save(producto);

  res.send(prod);
});

api.put('/:id', async (req, res) => {
  const idProductoActualizar = req.params.id;

  const productoActualizado = req.body;
  const updatedProduct = await productosDao.updateById(
    idProductoActualizar,
    productoActualizado
  );

  res.send(updatedProduct);
});

api.delete('/:id', async (req, res) => {
  const id = req.params.id;

  await productosDao.deleteById(id);

  res.send({ message: 'Producto eliminado correctamente' });
});
