import { Router } from 'express'
import {createProductos} from '../../faker/productos.js'

const productosApiRouter = new Router()

productosApiRouter.get('/productos', (req, res) => {
    res.json(createProductos(5))
})

export default productosApiRouter
