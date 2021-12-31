import { TUser } from "src/models/User";
import jwt from "jsonwebtoken";

export const signToken = (user: TUser, time?: string | number) => {
  const secret = user.role === "admin" 
    ? process.env.ACCESS_TOKEN_ADMIN as string
    : process.env.ACCESS_TOKEN_USER as string
  const token = jwt.sign({id: user.id}, secret, { expiresIn: time })
  return token
}