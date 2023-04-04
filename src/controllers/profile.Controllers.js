export const getProfileController = async (req, res) => {
    if (!req.session.passport?.user) {
        res.redirect("/login.html");
    } else {
        res.redirect("profile.html", { user: req.session.passport?.user });
    }
}