import { Router } from 'express'
import { getErrorController } from '../../controllers/error.js'

export const error = Router()
error.get('/' , getErrorController)