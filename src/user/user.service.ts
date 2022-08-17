import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./schema/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { SignupInput } from "../auth/dto/signup.input";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findOne(query) {
    return this.userModel.findOne(query).lean();
  }

  async create(signupInput: SignupInput) {
    const saltOrRounds = 10;
    signupInput.password = await bcrypt.hash(signupInput.password, saltOrRounds);
    return this.userModel.create(signupInput);
  }
}
