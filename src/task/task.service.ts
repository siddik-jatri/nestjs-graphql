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

  findAll(author?: string, status?: boolean) {
    const query = {};
    if (author) {
      query['author'] = author;
    }

    if (status) {
      query['status'] = status;
    }
    return this.taskModel.find(query).populate('author');
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

  async paginateTasks(page: number, limit: number) {
    const tasks = await this.taskModel.find().limit(limit).skip((page - 1) * limit).populate('author');
    const count = await this.taskModel.countDocuments();
    return {
      count,
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    }
  }
}
