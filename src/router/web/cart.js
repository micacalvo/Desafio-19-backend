import { Router } from "express";
import { getCartController } from "../../controllers/cart.Controllers.js";

const cartWebRouter = new Router();

cartWebRouter.get("/cart", getCartController);

export default cartWebRouter;