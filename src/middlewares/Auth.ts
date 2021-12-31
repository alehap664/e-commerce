import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest } from '../types'
import BaseError from '../error-handler'
import Users from '../models/User'
import BaseResponse from '../response'

export default {
  admin: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '') || ''
      const data = jwt.verify(token, process.env.ACCESS_TOKEN_ADMIN as string)
      
      if ( typeof data === 'string') {
        throw new BaseError('Not authorized to access this resource')
      }
      const user = await Users.getById(data.id)
      if (!user) {
        throw new BaseError('Not authorized to access this resource')
      }
      req.user = user
      next()
      
    } catch (error) {
      if (error instanceof BaseError) {
        const response = new BaseResponse().status(error.statusCode).isError().setMessage(error.message)
        res.status(error.statusCode).json(response)
        return
      }
      if (error instanceof jwt.JsonWebTokenError) {
        const response = new BaseResponse().isError().setMessage('Not authorized to access this resource')
        res.status(response.statusCode()).json(response)
        return
      }
      
      const response = new BaseResponse().status(400).isError().setMessage(error.massage)
      res.status(response.statusCode()).send(response)
    }
  },
  // user: (req: Request, res: Response, next: NextFunction) => {
  //   const token = req.header('Authorization')?.replace('Bearer ', '') || ''
  //   const data = jwt.verify(token, process.env.ACCESS_TOKEN_USER as string)
  
  //   try {
  //     next()
      
  //   } catch (error) {
  //     const response = new BaseResponse().status(401).isError().setMessage('Not authorized to access this resource')
  //     res.status(401).json(response)
  //   }
  // }
}