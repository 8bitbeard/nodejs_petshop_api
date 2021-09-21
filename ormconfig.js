require("dotenv").config();

module.exports = {
    type: "postgres",
    host: process.env.TYPEORM_HOST || 'localhost',
    port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [
        "src/entities/*.ts"
    ],
    migrations: [
        "src/database/migrations/*.ts"
    ],
    cli: {
        "migrationsDir": "src/database/migrations",
        "entitiesDir": "src/entities"
    },
    autoSchemaSync: true
};