import { Connection, getCustomRepository, Repository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
import { User } from "../entities/User";


// type UsersDependencies = {
//     usersRepository: UsersRepositories
// }

// class UsersService {
//     constructor(
//         private dependencies: UsersDependencies
//     ) {}

//     async create(name: string, email: string, password: string) {

//     }
// }

class UsersService {
    private usersRepository: Repository<User>

    constructor(connection: Connection) {
        this.usersRepository = connection.getRepository(User)
    }

    async create(name: string, email: string, password: string) {

        if(!email) {
            throw new Error("Email incorrect!");
        }

        const userAlreadyExists = await this.usersRepository.findOne({
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

        const user = this.usersRepository.create({
            name,
            email,
            password: passwordHash
        })

        await this.usersRepository.save(user);

        return user;
    }

    async index() {
        const users = await this.usersRepository.find()

        return users
    }
}



// class UsersService {
//     async create(name: string, email: string, password: string) {
//         const usersRepositories = getCustomRepository(UsersRepositories);

//         if(!email) {
//             throw new Error("Email incorrect!");
//         }

//         const userAlreadyExists = await usersRepositories.findOne({
//             email
//         });

//         if (userAlreadyExists) {
//             throw new Error("User already exists");
//         }

//         const isNum = /^\d+$/.test(password);

//         if(!isNum) {
//             throw new Error("Password must contain only numbers!")
//         }

//         if(password.length != 4) {
//             throw new Error("Password size must be equal to 4!")
//         }

//         const passwordHash = await hash(password, 8)

//         const user = usersRepositories.create({
//             name,
//             email,
//             password: passwordHash
//         })

//         await usersRepositories.save(user);

//         return user;
//     }

//     async index() {
//         const usersRepositories = getCustomRepository(UsersRepositories)

//         const users = await usersRepositories.find()

//         return users
//     }
// }


export { UsersService }