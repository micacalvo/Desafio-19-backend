import { Router } from 'express'
<<<<<<< HEAD
import config from '../../config/config.js'

import path from 'path'
=======
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37

const productosWebRouter = new Router()

productosWebRouter.get('/home', webAuth, (req, res) => {
    res.sendFile('main.html', {root: 'public'})
    // res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre: req.session.nombre })
})

<<<<<<< HEAD
productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile('productos-vista-test.html', { root: 'public' })
=======
productosWebRouter.get('/productos', (req, res) => {
    res.sendFile('productos.html', { root: 'public' })
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37
})

function webAuth(req, res, next) {
    if (req.session.passport?.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

export default productosWebRouter