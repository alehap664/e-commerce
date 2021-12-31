abstract class BaseErrorABC {
  protected abstract _message: string
  protected abstract _statusCode: number
}

export default class BaseError extends BaseErrorABC {
  protected _message: string;
  protected _statusCode: number;
  constructor(message = 'Error') {
    super()
    this._message = message
    this._statusCode = 200
  }

  status(code: number): this {
    this._statusCode = code
    return this
  }
  get message(): string {
    return this._message
  }

  get statusCode(): number {
    return this._statusCode
  }

}