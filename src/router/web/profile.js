import { Router } from "express";
import { getProfileController } from "../../controllers/profile.Controllers.js";

const profileWebRouter = new Router();

profileWebRouter.get("/profile", getProfileController);

export default profileWebRouter;
