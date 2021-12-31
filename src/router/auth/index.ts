import express from 'express'
import AuthController from '../../controllers/auth.controller';

const Router = express.Router();

const { signIn, signUp } = AuthController

Router.post('/sign-in', signIn)
Router.post('/sign-up', signUp)

export default Router;