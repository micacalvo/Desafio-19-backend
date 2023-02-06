import { Router } from 'express'
import { authWeb } from '../../auth/funcionAuth.js'

const productosWebRouter = new Router()

productosWebRouter.get('/main', authWeb, (req, res) => {
    res.render('/main.html')
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.render('/test.html')
})

export default productosWebRouter