//Función de autenticación
export function authApi(req, res, next) {
    if (req.session?.nombre) {
        next()
    } else {
        res.status(401).json({ error: 'No autorizado' })
    }
}

export function authWeb(req, res, next) {
    if (req.session.passport?.user) {
        next()
    } else {
        res.redirect('/login')
    }
}