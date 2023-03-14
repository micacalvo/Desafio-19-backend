import { usuariosDao, productosDao } from "../daos/daos.js"

export const getHomeController = async (req, res) => {
    if (req.isAuthenticated()) {
        const nombre = (await usuariosDao.getById(req.session.passport.user))[0].name
        global.productos = await productosDao.getAll()
        res.render('public/main', {
            nombre: nombre,
            productos: global.productos,
            active: 'main' //Pestaña activa de NAVBAR
        })
    } else {
        res.redirect('/login.html')
    }
}
