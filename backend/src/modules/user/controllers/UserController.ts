import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import User from "../../../types/User";
import ResponseHandler from "../../../shared/utils/ResponseHandler";
import JwtHandler from "../../../shared/utils/JwtHandler";

export default class UserController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password, is_remember } = req.body;

    const user = await this._userService.registerUser({
      email,
      password_hash: password,
      is_remember,
    });

    JwtHandler(res, 201, "Register Successfully", {
      email: user.email,
      id: user.id,
    });
  }

  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password, is_remember } = req.body;

    const user = await this._userService.loginUser({
      email,
      password_hash: password,
      is_remember,
    });

    JwtHandler(res, 201, "Login Successfully", {
      email: user.email,
      id: user.id,
    });
  }
}
