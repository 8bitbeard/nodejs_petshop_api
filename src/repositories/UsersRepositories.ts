import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User"

interface IUsersRepositories {
    
}

@EntityRepository(User)
class UsersRepositories extends Repository<User>{}

export { UsersRepositories }