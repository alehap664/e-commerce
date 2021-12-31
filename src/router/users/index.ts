import express from 'express'
import UserController from '../../controllers/users.controller';
import AuthMiddleWare from '../../middlewares/Auth';

const Router = express.Router();

const { allUser, createUser, updateUser, deleteUser, userById } = UserController
const { admin } = AuthMiddleWare

Router.get('/', admin, allUser)
Router.post('/', createUser)

Router.get('/:id', userById)
Router.put('/:id', updateUser)
Router.delete('/:id', deleteUser)

export default Router;