export const getProfileController = async (req, res) => {
    if (!req.session.passport?.user) {
        res.redirect("/login.ejs");
    } else {
        res.redirect("profile.ejs", { user: req.session.passport?.user });
    }
}