export const getCartController = async (req, res) => {
    if (!req.session.passport?.user) {
        res.redirect("login.html");
    } else {
        res.redirect("cart.html", { user: req.session.passport?.user });
    }
}


