import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Todo } from '../../models/todo.model';
import {TodoService} from "./todo.service";

@Resolver(of => Todo)
export class TodoResolver {

    constructor(
        private readonly service: TodoService
    ) {
    }

    @Query(returns => [Todo], { name: 'getAllTodos' })
    getAllTodos(): Todo[] {
        return this.service.getAllTodos();
    }

    @Mutation(returns => Todo)
    createTodo(
        @Args('title') title: string,
    ): Todo {
        return this.service.createTodo(title);
    }

    @Mutation(returns => Todo, { nullable: true })
    updateTodo(
        @Args('id') id: number,
        @Args('completed') completed: boolean,
    ): Todo | null {
        return this.service.updateTodo(id, completed);
    }

    @Mutation(returns => Boolean)
    deleteTodo(
        @Args('id') id: number,
    ): boolean {
        return this.service.deleteTodo(id);
    }
}
