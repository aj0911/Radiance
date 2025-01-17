import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import User from "../../../types/User";
import ResponseHandler from "../../../shared/utils/ResponseHandler";

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

    ResponseHandler(res, 201, {
      success: true,
      message: "Register Successfully",
      data: user,
    });
  }
}
