import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user", async () => {
    const userData = {
      first_name: "Integration",
      last_name: "Testing",
      email: "integration.testing@example.com",
      password: "123456",
    };

    const response = await request(app).post("/api/v1/users").send(userData);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.first_name).toEqual(userData.first_name);
    expect(response.body.last_name).toEqual(userData.last_name);
    expect(response.body.email).toEqual(userData.email);
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
  });

  it("should not be able to create a user with an already used email", async () => {
    const userData = {
      first_name: "Integration",
      last_name: "Testing",
      email: "integration.testing@example.com",
      password: "123456",
    };

    const response = await request(app).post("/api/v1/users").send(userData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      code: "USER_EXISTS",
      message: "User already exists!",
      details: ["This e-mail is already in use by another user!"],
    });
  });

  it("should not be able to create a user with an invalid password", async () => {
    const userData = {
      first_name: "Invalid",
      last_name: "Password",
      email: "invalid_password@example.com",
      password: "1234",
    };
    const response = await request(app).post("/api/v1/users").send(userData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      code: "INVALID_PASSWORD",
      message: "The informed password is invalid!",
      details: [
        "The password must contain only numbers, be bigger than 5 digits, and be smaller than 13 digits!",
      ],
    });
  });
});
