import { Router } from 'express'
import { getHomeController } from '../../controllers/main.js'

export const main = Router()
main.get('/' , getHomeController)

export default main