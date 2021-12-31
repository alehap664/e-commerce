import { UsersErrorMapping, UsersErrorMessage, TUser } from '../../models/User';
import BaseResponse from "..";
UsersErrorMapping

export default class UserResponse extends BaseResponse {
  protected code: number
  protected success: boolean
  protected message: string
  protected data: TUser[] | TUser | null
  constructor() {
    super()
  };

  mappingMessage(valueMapping: UsersErrorMessage): this {
    const message = UsersErrorMapping[valueMapping]
    if (message) {
      this.setMessage(UsersErrorMapping[valueMapping])
    }
    this.code = valueMapping === 'ER_NO_SUCH_TABLE' ? 500 : 400
    return this
  }

  setData(users: TUser[] | TUser): this {
    this.data = users || null
    return this
  }
}