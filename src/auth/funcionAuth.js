//Función de autenticación
export function authApi(req, res, next) {
    if (req.session?.nombre === nombre && req.session?.admin) {
        return next()
    }
    return res.status(401).send('Error de autenticacion')
}

export function authWeb(req, res, next) {
    if (req.session.passport?.user) {
        next()
    } else {
        res.redirect('/login')
    }
}