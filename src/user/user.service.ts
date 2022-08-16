import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { Model } from "mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserInput: CreateUserInput) {
    return this.userModel.create(createUserInput);
  }

  findAll() {
    return this.userModel.aggregate([
      {
        $lookup:{
          from: "tasks",
          localField: "_id",
          foreignField: "author",
          as: "tasks"
        }
      },
      {
        $project: {
          id: "$_id",
          name: 1,
          email: 1,
          totalTask: {
            $size: "$tasks"
          }
        }
      }
    ]);
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).populate('tasks');
    user['totalTask'] = user['tasks'].length
    return user;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true });
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }
}
