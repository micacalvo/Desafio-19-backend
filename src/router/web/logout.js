import { Router } from 'express'
import { getLogoutController } from '../../controllers/logout.js'

export const logout = Router();
logout.get('/' ,  getLogoutController)
