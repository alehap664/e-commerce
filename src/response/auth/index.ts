import { TAuthUser, TUser } from "../../models/User";
import BaseResponse from "..";
import BaseError from "../../error-handler";

export default class AuthResponse extends BaseResponse {
  protected data: TAuthUser | null
  protected token: string;
  constructor() {
    super()
  }

  setData(users: TUser): this {
    const { id, username, role } = users
    this.data = users && { id, username, role, token: '' } || null
    return this
  }

  setToken(token: string): this {
    if (!this.data) {
      throw new BaseError('setData before setToken')
    }
    this.data.token = token
    return this
  }
}