export class ResponseModel<T> {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: T,
    public error?: any,
  ) {}

  static success<T>(
    data: T,
    message: string = 'Success',
    statusCode: number = 200,
  ): ResponseModel<T> {
    return new ResponseModel(statusCode, message, data);
  }

  static error(
    message: string,
    error: any = null,
    statusCode: number = 400,
  ): ResponseModel<null> {
    return new ResponseModel(statusCode, message, null, error);
  }
}
