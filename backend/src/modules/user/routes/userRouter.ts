import { Router } from "express";
import UserController from "../controllers/UserController";
import Protect from "../../../shared/middlewares/ProtectMiddleware";


const UserRouter = Router();
const userController = new UserController();

UserRouter.post('/user/register',Protect(userController.registerUser.bind(userController)));

export default UserRouter;