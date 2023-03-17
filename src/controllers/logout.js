export const getLogoutController = (req, res) => {
    res.redirect('/logout.html', { nombre : req.session.nombre})
    req.session.destroy()
}