/* import path from 'path'

export const getErrorController = (req, res ) => {
    if(req.session.route == 'register') {
        path.join('../public/uploads/' + req.session.fileName)
    }
    res.redirect('/register-error.html' , {
        message: req.session.message,
        route: req.session.route
    })
    req.session.destroy()
} */