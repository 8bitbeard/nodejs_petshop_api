import { instanceToInstance } from "class-transformer";

import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IResponseUserDTO } from "../dtos/IResponseUserDTO";

class UserMap {
  static toDTO({
    id,
    first_name,
    last_name,
    email,
    created_at,
    updated_at,
  }: User): IResponseUserDTO {
    const user = instanceToInstance({
      id,
      first_name,
      last_name,
      email,
      created_at,
      updated_at,
    });

    return user;
  }
}

export { UserMap };
