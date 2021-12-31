import { Request, Response } from 'express'
import Users, { UsersErrorMessage } from '../models/User'
import UserResponse from '../response/users'
import { AuthRequest } from 'src/types';

export default {
  allUser: async (_req: AuthRequest, res: Response) => {
    try {
      const users = await Users.all()
      const response = new UserResponse().setData(users)
      res.status(response.statusCode()).json(response)
      
    } catch (error) {
      const code: UsersErrorMessage = error.code;
      const response = new UserResponse().isError().mappingMessage(code)
      res.status(response.statusCode()).json(response)
    }
  },
  userById: async (req: Request, res: Response) => {
    try {
      const users = await Users.getById(+req.params.id)
      const response = new UserResponse().setData(users)
      res.status(response.statusCode()).json(response)
      
    } catch (error) {
      const code: UsersErrorMessage = error.code;
      const response = new UserResponse().isError().mappingMessage(code)
      res.status(response.statusCode()).json(response)
    }
  },
  createUser: async (req: Request, res: Response) => {
    try {
      const users = await Users.createUser(req.body)
      const response = new UserResponse().status(201).setData(users).setMessage('Created')
      res.status(response.statusCode()).json(response)
      
    } catch (error) {
      const code: UsersErrorMessage = error.code;
      const response = new UserResponse().isError().mappingMessage(code)
      res.status(response.statusCode()).json(response)
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const users = await Users.updateUser(+req.params.id, req.body)
      const response = new UserResponse().setData(users).setMessage('Updated')
      res.status(response.statusCode()).json(response)
      
    } catch (error) {
      const code: UsersErrorMessage = error.code;
      const response = new UserResponse().isError().mappingMessage(code)
      res.status(response.statusCode()).json(response)
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const users = await Users.deleteUser(+req.params.id)
      const response = new UserResponse().setData(users).setMessage('Delected')
      res.status(response.statusCode()).json(response)
      
    } catch (error) {
      const code: UsersErrorMessage = error.code;
      const response = new UserResponse().isError().mappingMessage(code)
      res.status(response.statusCode()).json(response)
    }
  },
}
