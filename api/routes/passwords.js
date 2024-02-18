import express from 'express'
import { createPasswordCtrl } from '../controllers/passwords.js'
import { validateCreatePassword } from '../middleware/passwords.js' 

const passwordsRoutes = express.Router()

passwordsRoutes.route('/passwords')
.post([validateCreatePassword], createPasswordCtrl)

export {
    passwordsRoutes
}