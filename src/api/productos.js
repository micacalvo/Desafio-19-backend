import { Router } from 'express';
<<<<<<< HEAD
import productosDAO from '../models/daos/Productos.Dao.js';
=======
import productosDAO from '../models/daos/productos/ProductosDaoMongodb.js';
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37

export const api = Router();

const productosDao = new productosDAO();

api.get('/', async (req, res) => {
<<<<<<< HEAD
  const prods = await productosDao.listarAll();
=======
  const prods = await productosDao.getAll();
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37

  res.send(prods);
});

api.get('/:id', async (req, res) => {
  const id = req.params.id;
<<<<<<< HEAD
  const prod = await productosDao.listar(id);
=======
  const prod = await productosDao.getById(id);
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37

  res.send(prod);
});

api.post('/', async (req, res) => {
  const producto = req.body;
<<<<<<< HEAD
  const prod = await productosDao.guardar(producto);
=======
  const prod = await productosDao.save(producto);
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37

  res.send(prod);
});

api.put('/:id', async (req, res) => {
  const idProductoActualizar = req.params.id;

  const productoActualizado = req.body;
<<<<<<< HEAD
  const updatedProduct = await productosDao.actualizar(
=======
  const updatedProduct = await productosDao.updateById(
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37
    idProductoActualizar,
    productoActualizado
  );

  res.send(updatedProduct);
});

api.delete('/:id', async (req, res) => {
  const id = req.params.id;

<<<<<<< HEAD
  await productosDao.borrar(id);
=======
  await productosDao.deleteById(id);
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37

  res.send({ message: 'Producto eliminado correctamente' });
});
