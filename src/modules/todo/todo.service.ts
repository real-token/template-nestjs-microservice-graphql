import { Injectable } from "@nestjs/common";
import {Todo} from "../../models/todo.model";

@Injectable()
export class TodoService {
    private todos: Todo[] = [];

    constructor(
    ) {}

    getAllTodos() {
        return this.todos;
    }

    createTodo(title: string) {
        const todo = {
            id: this.todos.length + 1,
            title,
            completed: false,
        };
        this.todos.push(todo);
        return todo;
    }

    updateTodo(id, completed) {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) return null;
        todo.completed = completed;
        return todo;
    }

    deleteTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) return false;
        this.todos.splice(index, 1);
        return true;
    }
}