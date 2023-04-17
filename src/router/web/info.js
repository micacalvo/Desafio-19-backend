import { Router } from 'express'
import os from 'os'
import config from '../../config/config.js'
const pathname = new URL(import.meta.url)
const infoWebRouter = new Router()
import path from 'path'

infoWebRouter.get('/info', (req, res) => {
    res.render(path.join(process.cwd(), '/views/pages/info.ejs'), {
        specs: config.getSpecs()
    })
})

export default infoWebRouter