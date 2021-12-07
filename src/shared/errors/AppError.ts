interface IError {
  code: string;
  message: string;
  details: string[];
  statusCode: number;
}

export class AppError {
  readonly code: string;

  readonly message: string;

  readonly details: string[];

  readonly statusCode: number;

  constructor({ code, message, details, statusCode }: IError) {
    this.code = code;
    this.message = message;
    this.details = details;
    this.statusCode = statusCode;
  }
}
