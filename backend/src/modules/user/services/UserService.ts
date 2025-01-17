import ErrorHandler from "../../../shared/utils/ErrorHandler";
import User from "../../../types/User";
import UserRepository from "../repositories/UserRepository";

export default class UserService {

    private _userRepository:UserRepository
    constructor() {
        this._userRepository =  new UserRepository();
    }

    async registerUser(userData: Partial<User>):Promise<User>{

        const {email, password_hash,is_remember} = userData;
        if(!email || !password_hash){
            throw new ErrorHandler('All Fields are mandatory',404);
        }
        
        return await this._userRepository.create({
            email,
            password_hash,
            is_remember
        })
    }

}