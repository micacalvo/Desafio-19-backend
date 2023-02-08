import { Router } from 'express'
import { authWeb } from '../../auth/funcionAuth.js'

const productosWebRouter = new Router()

productosWebRouter.get('/main', authWeb, (req, res) => {
    res.render('/main.html')
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.render('/test.html')
})

productosWebRouter.get('/info', (req, res) => {
    console.log(process.memoryUsage())
    const datos = {
        specs: [
            { title: 'Argumentos de entrada', value: process.argv.slice(2).join(', ') },
            { title: 'Plataforma', value: process.platform },
            { title: 'Version de node', value: process.version },
            { title: 'Memoria total reservada (MB)', value: parseInt(process.memoryUsage().rss / 1024 / 1024) },
            { title: 'Path de ejecucion del entorno', value: process.execPath },
            { title: 'Id de proceso', value: process.pid },
            { title: 'Path del proyecto', value: process.cwd() },
        ]
    }
    res.render(path.join(process.cwd(), '/public/info.html'), datos)
})

export default productosWebRouter