export const getHomeController = async (req, res) => {
    if (!req.session.passport?.user) {
        res.redirect('login.html')
    } else {
        res.redirect('/home.html', { user: req.session.passport?.user })
    }
}
