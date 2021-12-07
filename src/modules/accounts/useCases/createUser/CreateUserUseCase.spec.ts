import { UsersRepositoryInMemory } from "../../repositories/InMemory/UsersRepositoryInMemory";
import * as CreateUserError from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User UseCase", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("should be able to create a new user", async () => {
    const userData = {
      first_name: "Unit",
      last_name: "Test",
      email: "unit_test@exmaple.com",
      password: "unittest",
    };

    const user = await createUserUseCase.execute(userData);

    expect(user).toHaveProperty("id");
    expect(user.first_name).toEqual(userData.first_name);
    expect(user.last_name).toEqual(userData.last_name);
    expect(user.email).toEqual(userData.email);
    expect(user).not.toHaveProperty("password");
  });

  it("should not be able to create a user with an already user e-mail", async () => {
    const userData = {
      first_name: "Unit",
      last_name: "Test",
      email: "unit_test@exmaple.com",
      password: "unittest",
    };

    await createUserUseCase.execute(userData);

    expect(async () => {
      await createUserUseCase.execute(userData);
    }).rejects.toBeInstanceOf(CreateUserError.UserAlreadyExists);
  });
});
