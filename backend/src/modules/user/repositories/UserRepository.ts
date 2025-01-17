import BaseRepository from "../../../shared/Repositories/BaseRepository";
import User from "../../../types/User";
import UserModel from "../models/UserModel";

export default class UserRepository extends BaseRepository<User> {

  constructor() {
    super(UserModel);
  }
  
}