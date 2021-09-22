import { Request, Response } from "express";

import { UsersService } from "../services/UsersService";


class UsersController {
    async create(request: Request, response: Response) {
        const usersService = new UsersService();

        const { name, email, password} = request.body;

        const user = await usersService.create(name, email, password);

        return response.status(201).json(user);
    }


    async index(request: Request, response: Response) {
        const usersService = new UsersService()

        const users = await usersService.index();

        return response.status(200).json(users)
    }
}

export { UsersController }