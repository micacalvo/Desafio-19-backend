import { Router } from "express";

import { uploader } from "../../utils/multer/multer.js";
import { authenticate } from "../../utils/passport/passport.js";
import { getLogin, getLoginError, getLogout, getSignin, postSignin } from "../../controllers/auth.Controllers.js";

const authWebRouter = new Router();

// Rutas login
authWebRouter.get("/", (req, res) => {
  res.redirect("login");
});

authWebRouter.get("/login", getLogin);

authWebRouter.post("/login", authenticate);

// Rutas Logout
authWebRouter.get("/logout", getLogout);

//Login-error
authWebRouter.get("/login-error", getLoginError);

//Signin
authWebRouter.get("/register", getSignin);

authWebRouter.post("/register", uploader.single("foto"), postSignin);

export default authWebRouter;
