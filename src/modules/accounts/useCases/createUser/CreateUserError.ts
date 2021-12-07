import { AppError } from "../../../../shared/errors/AppError";

export class UserAlreadyExists extends AppError {
  constructor() {
    super({
      code: "USER_EXISTS",
      message: "User already exists!",
      details: ["This e-mail is already in use by another user!"],
      statusCode: 400,
    });
  }
}
export class InvalidPassword extends AppError {
  constructor() {
    super({
      code: "INVALID_PASSWORD",
      message: "The informed password is invalid!",
      details: [
        "The password must contain only numbers, be bigger than 5 digits, and be smaller than 13 digits!",
      ],
      statusCode: 400,
    });
  }
}
