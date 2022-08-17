import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Model } from "mongoose";
import { Task, TaskDocument } from "./schema/task.schema";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../user/schema/user.schema";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name)  protected taskModel: Model<TaskDocument>) {}

  create(createTaskInput: CreateTaskInput, user: User) {
    return this.taskModel.create({ ...createTaskInput, author: user._id });
  }

  findAll() {
    return this.taskModel.find();
  }

  findById(id: string) {
    return this.taskModel.findById(id);
  }

  update(id: string, updateTaskInput: UpdateTaskInput) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskInput);
  }

  remove(id: string) {
    return this.taskModel.findByIdAndRemove(id);
  }
}
