import { Request, Response } from "express";

import { UsersService } from "../services/UsersService";


class UsersController {
    async index(request: Request, response: Response) {
        const usersService = new UsersService()

        const users = await usersService.index();

        return response.status(201).json(users)
    }
}

export { UsersController }