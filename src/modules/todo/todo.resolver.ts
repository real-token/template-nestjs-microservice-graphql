import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Todo } from '../../models/todo.model';
import {TodoService} from "./todo.service";

@Resolver(of => Todo)
export class TodoResolver {

    constructor(
        private readonly service: TodoService
    ) {
    }

    @Query(/* istanbul ignore next */returns => [Todo], { name: 'getAllTodos' })
    getAllTodos(): Todo[] {
        return this.service.getAllTodos();
    }

    @Mutation(/* istanbul ignore next */ returns => Todo)
    createTodo(
        @Args('title') title: string,
    ): Todo {
        return this.service.createTodo(title);
    }

    /* istanbul ignore next */
    @Mutation(/* istanbul ignore next */returns => Todo, { nullable: true })
    updateTodo(
        @Args('id') id: number,
        @Args('completed') completed: boolean,
    ): Todo | null {
        return this.service.updateTodo(id, completed);
    }

    /* istanbul ignore next */
    @Mutation(/* istanbul ignore next */returns => Boolean)
    deleteTodo(
        @Args('id') id: number,
    ): boolean {
        return this.service.deleteTodo(id);
    }
}
