import { Router } from 'express'
import { getRegisterController , postRegisterController } from '../../controllers/register.js';
import { upload } from '../../multer/multer.js';

export const register = Router();
register.get('/', getRegisterController )

register.post('/', postRegisterController )

//upload.single('photo')