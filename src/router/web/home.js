import { Router } from 'express'
import { authWeb } from '../../auth/funcionAuth.js'
import  config  from '../../config.js'

const productosWebRouter = new Router()

productosWebRouter.get('/main', authWeb, (req, res) => {
    res.render('/main.html')
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.render('/test.html')
})

productosWebRouter.get('/info', (req, res) => {
    console.log(process.memoryUsage())
    res.render(path.join(process.cwd(), '/public/info.html'), {
        specs: config.getSpecs()})
    })

export default productosWebRouter