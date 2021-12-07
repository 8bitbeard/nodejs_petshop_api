import * as CreateUserError from "./CreateUserError";

describe("Create User Error", () => {
  it("should be able to raise a UserAlreadyExist Error", async () => {
    try {
      throw new CreateUserError.UserAlreadyExists();
    } catch (err) {
      expect(err).toMatchObject({
        statusCode: 400,
        code: "USER_EXISTS",
        message: "User already exists!",
        details: ["This e-mail is already in use by another user!"],
      });
    }
  });
});
