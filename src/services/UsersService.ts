import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";


class UsersService {
    async create(name: string, email: string, password: string) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        if(!email) {
            throw new Error("Email incorrect!");
        }

        const userAlreadyExists = await usersRepositories.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const isNum = /^\d+$/.test(password);

        if(!isNum) {
            throw new Error("Password must contain only numbers!")
        }

        if(password.length != 4) {
            throw new Error("Password size must be equal to 4!")
        }

        const passwordHash = await hash(password, 8)

        const user = usersRepositories.create({
            name,
            email,
            password: passwordHash
        })

        await usersRepositories.save(user);

        return user;
    }

    async index() {
        const usersRepositories = getCustomRepository(UsersRepositories)

        const users = await usersRepositories.find()

        return users
    }
}


export { UsersService }