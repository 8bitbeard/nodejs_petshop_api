import request from "supertest";
import { getConnection, createConnection } from "typeorm";
import { app } from "../../app";
// import createConnection from "../../database";
import { testingConfiguration } from "../../../ormconfig";

describe('Users', () => {
    beforeEach(async() => {
        const connection = await createConnection(testingConfiguration);

        await connection.runMigrations();
    })

    afterEach(async () => {
        const connection = getConnection();

        await connection.dropDatabase();

        await connection.close();
    })

    describe('GET /v1/users', () => {
        it('should be able to return a list of created users', async () => {
            const response = await request(app).get('/api/v1/users').send()

            expect(response.status).toBe(200);
        })
    })
})
