import ErrorHandler from "../../../shared/utils/ErrorHandler";
import User from "../../../types/User";
import UserRepository from "../repositories/UserRepository";
import bcrypt from 'bcryptjs'

export default class UserService {
  private _userRepository: UserRepository;
  constructor() {
    this._userRepository = new UserRepository();
  }

  async registerUser(userData: Pick<User,"email" | "password_hash" | "is_remember">): Promise<Pick<User,"email" | "id">> {
    const { email, password_hash, is_remember } = userData;
    if (!email || !password_hash) {
      throw new ErrorHandler("All Fields are mandatory", 404);
    }

    const user =  await this._userRepository.create({
      email,
      password_hash,
      is_remember,
      username: `default${Date.now()}`,
    });
    
    return {
        email:user.email,
        id:user.id
    }
  }

  async loginUser(userData:  Pick<User,"email" | "password_hash" | "is_remember">): Promise<Pick<User,"email" | "id">> {
    const { email, password_hash, is_remember } = userData;
    if (!email || !password_hash) {
      throw new ErrorHandler("All Fields are mandatory", 404);
    }

    let user:User | null = await this._userRepository.getUserByEmail(email);
    
    if(!user){
        throw new ErrorHandler('No user exist with this email',404);
    }

    const isPasswordMatch = await bcrypt.compare(password_hash,user.password_hash);

    if(!isPasswordMatch){
        throw new ErrorHandler('Incorrect Password',400);
    }

    if(is_remember!==user.is_remember){
        user = await this._userRepository.update(user.id,{
            is_remember
        })
    }

    return {
        email:user?.email!,
        id:user?.id!
    }
  }
}
