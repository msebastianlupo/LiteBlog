import express from 'express'
import { createUserCtrl, findUserCtrl, getUsersCtrl, modifyUserCtrl, deleteUserCtrl, loginUserCtrl, logOutUserCtrl} from '../controllers/users.js'
import { validateCreateUser, validateModifyUser, validateAccess, checkAdminRole, preventEscalation} from '../middleware/users.js' 

const usersRoutes = express.Router()

usersRoutes.use('/users', [validateAccess])

usersRoutes.route('/users')
.get(getUsersCtrl)
.post([checkAdminRole, validateCreateUser], createUserCtrl)

usersRoutes.route('/users/:userId')
.get(findUserCtrl)
.patch([validateModifyUser, preventEscalation], modifyUserCtrl)
.delete([checkAdminRole], deleteUserCtrl)

usersRoutes.route('/session')
.post([validateCreateUser], loginUserCtrl)
.delete([validateAccess], logOutUserCtrl)

export {
    usersRoutes
}