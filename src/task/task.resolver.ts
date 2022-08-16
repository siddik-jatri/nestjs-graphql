import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Resolver('Task')
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation('createTask')
  create(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

  @Query('tasks')
  findAll(
    @Args('author', { nullable: true }) author?: string | null,
    @Args('status', { nullable: true }) status?: boolean | null,
  ) {
    return this.taskService.findAll(author, status);
  }

  @Query('task')
  findOne(@Args('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Query('paginateTasks')
  paginateTasks(
    @Args('page') page: number,
    @Args('limit') limit: number,
  ) {
    return this.taskService.paginateTasks(page, limit);
  }

  @Mutation('updateTask')
  update(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation('removeTask')
  remove(@Args('id') id: string) {
    return this.taskService.remove(id);
  }
}
