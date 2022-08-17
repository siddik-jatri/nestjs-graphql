import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from "./schema/task.schema";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Resolver(() => Task)
@UseGuards(JwtAuthGuard)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput, @Context() ctx) {
    return this.taskService.create(createTaskInput, ctx.req.user);
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.taskService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.taskService.findById(id);
  }

  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput._id, updateTaskInput);
  }

  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => String }) id: string) {
    return this.taskService.remove(id);
  }
}
