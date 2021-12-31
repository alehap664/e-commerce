
abstract class ResponseABC {
  protected abstract code: number;
  protected abstract success: boolean;
  protected abstract message: string;
  protected abstract status(code: number): void 
  protected abstract setMessage(message: string): void 
}

let isCustomMessage: boolean = false

export default class BaseResponse extends  ResponseABC {
  protected code: number = 200
  protected success: boolean = true
  protected message: string = 'Successfully'
  constructor() {
    super()
  };

  status(code: number): this {
    this.code = code
    return this
  }
  statusCode(): number {
    return this.code
  }
  isError(): this {
    this.success = false
    this.message = isCustomMessage ? this.message : 'Error'
    return this
  }
  setMessage(message: string): this {
    isCustomMessage = true;
    this.message = message
    return this
  }
}