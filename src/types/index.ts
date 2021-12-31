import { Request } from 'express'
import { TUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: TUser
}