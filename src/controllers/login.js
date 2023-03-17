import { usuariosDao } from "../daos/daos.js"

export const postLoginController = async (req, res, next) => {
    const usuarios = await usuariosDao.getAll()
    const user = usuarios.find(usuario => usuario.email === req.body.username)

    if (!user) {
        req.session.message = 'Usuario no encontrado'
    } else {
        if (!(req.body.password, user.password)) {
            req.session.message = 'Password incorrecto'
        }
    }
    req.session.route = 'login'
    next();
}

export const getLoginController = (req, res) => {
    res.redirect('login.html')
}