import { Request, Response } from 'express'
import BaseError from '../error-handler';
import Users from '../models/User'
import AuthResponse from '../response/auth'
import { signToken } from '../utils';

export default {
  signUp: async (req: Request, res: Response) => {
    try {
      const user = await Users.createUser(req.body)
      const token = signToken(user, '1m');

      const response = new AuthResponse().status(201).setData(user).setToken(token).setMessage('Sign Up')
      res.status(response.statusCode()).json(response)
    } catch (error) {
      const response = new AuthResponse().isError().setMessage(error.message)
      res.status(response.statusCode()).json(response)
    }
  },
  signIn: async (req: Request, res: Response) => {
    try {
      const user = await Users.signIn(req.body)
      const token = signToken(user, '1m');

      const response = new AuthResponse().setData(user).setToken(token)
      res.status(response.statusCode()).json(response)
    } catch (error) {
      if (error instanceof BaseError) {
        const response = new AuthResponse().status(error.statusCode).isError().setMessage(error.message)
        res.status(error.statusCode).json(response)
      }
      const response = new AuthResponse().status(400).isError().setMessage(error.message)
      res.status(response.statusCode()).json(response)
    }
  },
}
