import {Test, TestingModule} from '@nestjs/testing';
import {TodoService} from './todo.service';
import {NotFoundException} from "@nestjs/common";

describe('TodoService', () => {
    let service: TodoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TodoService],
        }).compile();

        service = module.get(TodoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAllTodos', () => {
        it('should return an empty array initially', () => {
            expect(service.getAllTodos()).toEqual([]);
        });
    });

    describe('createTodo', () => {
        it('should create a new todo', () => {
            const todo = service.createTodo('Test Todo');
            expect(todo).toEqual({
                id: 1,
                title: 'Test Todo',
                completed: false,
            });
        });
    });

    describe('updateTodo', () => {
        it('should update a todo', () => {
            service.createTodo('Test Todo');
            const updatedTodo = service.updateTodo(1, true);
            expect(updatedTodo).toEqual({
                id: 1,
                title: 'Test Todo',
                completed: true,
            });
        });

        it('should throw NotFoundException', () => {
            expect(() => service.updateTodo(999, true)).toThrow(NotFoundException);
        })
    });

    describe('deleteTodo', () => {
        it('should delete a todo', () => {
            service.createTodo('Test Todo');
            expect(service.deleteTodo(1)).toBe(true);
            expect(service.getAllTodos()).toEqual([]);
        });

        it('should throw NotFoundException', () => {
            expect(() => service.deleteTodo(999)).toThrow(NotFoundException);
        })
    });

});
