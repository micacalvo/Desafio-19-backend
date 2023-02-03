import { Router } from 'express'
import {createProductos} from '../../faker/productos.js'

const productosApiRouter = new Router()

productosApiRouter.get('/api/productos-test', async (req, res) => {
    res.json(createProductos(5))
})

export default productosApiRouter
