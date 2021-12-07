import { inject, injectable } from "tsyringe";

import { IResponseUserDTO } from "@modules/accounts/dtos/IResponseUserDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import * as CreateUserError from "./CreateUserError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    first_name,
    last_name,
    email,
    password,
  }: ICreateUserDTO): Promise<IResponseUserDTO> {
    const userAlreadyExists = await this.usersRepository.findUserByEmail(email);

    if (userAlreadyExists) {
      throw new CreateUserError.UserAlreadyExists();
    }

    const user = await this.usersRepository.create({
      first_name,
      last_name,
      email,
      password,
    });

    return UserMap.toDTO(user);
  }
}

export { CreateUserUseCase };
