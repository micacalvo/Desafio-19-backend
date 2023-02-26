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

productosWebRouter.get('/home', authWeb, (req, res) => {
    res.render('/usuario.html'), {
        nombre: req.user.nombre,
        foto: req.user.foto,
        email: req.user.email,
        // getSpecs
    }})

productosWebRouter.get('/info', (req, res) => {
//Toda esta información ya la tengo en el archivo de configuración, por eso no hace falta codificarla aca    
    // getSpecs
     console.log({
         entryArguments: JSON.stringify(args, null, 2),
         executionPath: process.execPath,
         platform: process.platform,
         processId: process.pid,
         nodeVersion: process.version,
         projectFile: process.cwd(),
         rss: JSON.stringify(process.memoryUsage(), null, 2),
         cpuNums: numeroCPUs,
     });
    
     res.render('info', {
         entryArguments: JSON.stringify(args, null, 2),
         executionPath: process.execPath,
         platform: process.platform,
         processId: process.pid,
         nodeVersion: process.version,
         projectFile: process.cwd(),
         rss: JSON.stringify(process.memoryUsage(), null, 2),
         cpuNums: numeroCPUs,
     });

    res.render(res.render('/info.html')), {
        specs: config.getSpecs()
    }
})

export default productosWebRouter