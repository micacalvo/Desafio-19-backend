export const getCartController = async (req, res) => {
    if (!req.session.passport?.user) {
        res.redirect("login.ejs");
    } else {
        res.redirect("cart.ejs", { user: req.session.passport?.user });
    }
}



