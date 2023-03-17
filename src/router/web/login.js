import { Router } from 'express'
import { getLoginController, postLoginController } from '../../controllers/login.js'
import { authenticate } from '../web/auth.js';

export const login = Router();
login.get('/' ,  getLoginController)

login.post('/' , postLoginController, authenticate )

