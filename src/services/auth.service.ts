import { IUser, IUserLogin } from "@/interface/user.interface";
import User from "@/model/user.model";
import { BadRequestError, UnauthenticatedError } from "@/utils/errors";

export class AuthService {
  async login(data: IUserLogin) {
    const {email, password} = data;

    if(!email || !password) {
      throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({email})
    if(!user){
      throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
      throw new UnauthenticatedError('Invalid Credentials')
    }

    return user;
  }

  async create(data: IUser) {
    const user = await User.create({...data});
    return user;
  }
  async verifyEmail(email: string) {
    const user = await User.findOneAndUpdate({ email }, { isVerified: true });
    if(!user){
      throw new UnauthenticatedError('Invalid Credentials')
    }
    return user;
  }
}
