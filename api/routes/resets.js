import express from 'express'
import { modifyPasswordCtrl } from '../controllers/resets.js'
import { validateModifyPassword } from '../middleware/resets.js' 

const resetsRoutes = express.Router()

resetsRoutes.route('/resets/:hash')
.patch([validateModifyPassword], modifyPasswordCtrl)

export {
    resetsRoutes
}