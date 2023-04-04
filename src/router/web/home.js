import { Router } from 'express'

const productosWebRouter = new Router()

productosWebRouter.get('/home', webAuth, (req, res) => {
    res.sendFile('main.html', {root: 'public'})
    // res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre: req.session.nombre })
})

productosWebRouter.get('/productos', (req, res) => {
    res.sendFile('productos.html', { root: 'public' })
})

function webAuth(req, res, next) {
    if (req.session.passport?.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

export default productosWebRouter