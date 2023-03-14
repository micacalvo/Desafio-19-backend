export const getLogoutController = (req, res) => {
    res.render('public/logout', { nombre : req.session.nombre})
    req.session.destroy()
}