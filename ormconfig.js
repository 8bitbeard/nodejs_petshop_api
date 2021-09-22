require("dotenv").config();

const baseDatabaseConfiguration = {
    type: 'postgres',
    entities: [
        "src/entities/*.ts"
    ],
    migrations: [
        "src/database/migrations/*.ts"
    ],
    cli: {
        "migrationsDir": "src/database/migrations",
        "entitiesDir": "src/entities"
    }
}

const defaultConfiguration = Object.assign({
    name: "default",
    host: process.env.TYPEORM_DEV_HOST || 'localhost',
    port: parseInt(process.env.TYPEORM_DEV_PORT, 10) || 5432,
    username: process.env.TYPEORM_DEV_USERNAME,
    password: process.env.TYPEORM_DEV_PASSWORD,
    database: process.env.TYPEORM_DEV_DATABASE,
}, baseDatabaseConfiguration)

const testingConfiguration = Object.assign({
    name: "testing",
    host: process.env.TYPEORM_TST_HOST || 'localhost',
    port: parseInt(process.env.TYPEORM_TST_PORT, 10) || 5432,
    username: process.env.TYPEORM_TST_USERNAME,
    password: process.env.TYPEORM_TST_PASSWORD,
    database: process.env.TYPEORM_TST_DATABASE,
}, baseDatabaseConfiguration)

module.exports = [ defaultConfiguration, testingConfiguration ]
