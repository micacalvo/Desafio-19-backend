import { Router } from 'express'
import { getCartController, postCartAddProductController, deleteCartProductController, postCartBuyController} from '../../controllers/cart.js'
export const cart = Router()

cart.get('/' , getCartController)
cart.post('/addProduct' , postCartAddProductController)
cart.delete('/deleteProduct/:id' , deleteCartProductController)
cart.post('/buy' , postCartBuyController)
