
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateTaskInput {
    task: string;
    status?: Nullable<boolean>;
    author: string;
}

export class UpdateTaskInput {
    id: string;
    task?: Nullable<string>;
    status?: Nullable<boolean>;
    author?: Nullable<string>;
}

export class CreateUserInput {
    name: string;
    email: string;
    password?: Nullable<string>;
}

export class UpdateUserInput {
    id: string;
    name: string;
    email: string;
    password?: Nullable<string>;
}

export class Task {
    id: string;
    task: string;
    status?: Nullable<boolean>;
    author: User;
}

export class PaginateTasks {
    tasks: Nullable<Task>[];
    count: number;
    totalPages: number;
    currentPage: number;
}

export abstract class IQuery {
    abstract tasks(author?: Nullable<string>, status?: Nullable<boolean>): Nullable<Task>[] | Promise<Nullable<Task>[]>;

    abstract task(id: string): Nullable<Task> | Promise<Nullable<Task>>;

    abstract paginateTasks(page?: Nullable<number>, limit?: Nullable<number>): PaginateTasks | Promise<PaginateTasks>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createTask(createTaskInput: CreateTaskInput): Task | Promise<Task>;

    abstract updateTask(updateTaskInput: UpdateTaskInput): Task | Promise<Task>;

    abstract removeTask(id: string): Nullable<Task> | Promise<Nullable<Task>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id: string;
    name: string;
    email: string;
    password?: Nullable<string>;
    tasks: Nullable<Task>[];
    totalTask?: Nullable<number>;
}

type Nullable<T> = T | null;
