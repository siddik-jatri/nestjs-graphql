import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskInput: CreateTaskInput) {
    const task = await this.taskModel.create(createTaskInput);
    return task.populate('author');
  }

  findAll() {
    return this.taskModel.find().populate('author');
  }

  findOne(id: string) {
    return this.taskModel.findById(id).populate('author');
  }

  update(id: string, updateTaskInput: UpdateTaskInput) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskInput, { new: true, populate: 'author' });
  }

  remove(id: string) {
    return this.taskModel.findByIdAndRemove(id).populate('author');
  }
}
