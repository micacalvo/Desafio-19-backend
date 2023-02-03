import { Router } from 'express'
import { authWeb } from '../../auth/funcionAuth.js'
import path from 'path'

const productosWebRouter = new Router()

productosWebRouter.get('/home', authWeb, (req, res) => {
    res.render(path.join(process.cwd(), '/public/home.html'), { nombre: req.session.nombre })
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/public/productos-vista-test.html'))
})

export default productosWebRouter