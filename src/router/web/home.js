import { Router } from "express";
import { getHomeController } from "../../controllers/home.Controllers.js";

const homeWebRouter = new Router();

homeWebRouter.get("/home", getHomeController);

export default homeWebRouter;