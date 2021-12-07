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
