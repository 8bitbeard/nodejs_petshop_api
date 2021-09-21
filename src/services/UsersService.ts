import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


class UsersService {
    async index() {
        const usersRepositories = getCustomRepository(UsersRepositories)

        const users = await usersRepositories.find()

        return users
    }
}


export { UsersService }