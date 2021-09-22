import { Router } from "express";

import { UsersController } from "./controllers/UsersController";

const router = Router();

const usersController = new UsersController()


router.get("/v1/users", usersController.index)
router.post("/v1/users", usersController.create)

export { router }