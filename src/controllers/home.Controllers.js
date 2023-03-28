export const getHomeController = async (req, res) => {
    if (!req.session.passport?.user) {
        res.redirect('login.ejs')
    } else {
        res.redirect('/home.ejs', { user: req.session.passport?.user })
    }
}
