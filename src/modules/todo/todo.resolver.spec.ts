import {Test, TestingModule} from '@nestjs/testing';
import {TodoResolver} from './todo.resolver';
import {TodoService} from './todo.service';
import {TodoServiceMock} from "./todo.service.mock";
import {NotFoundException} from "@nestjs/common";

describe('TodoResolver', () => {
    let resolver: TodoResolver;
    let serviceMock: TodoServiceMock;

    beforeEach(async () => {
        serviceMock = new TodoServiceMock();
        serviceMock.setElement({ /* votre élément mocké */});
        serviceMock.setElements([ /* vos éléments mockés */]);

        const module: TestingModule = await Test.createTestingModule({
            providers: [TodoResolver,
                {provide: TodoService, useValue: serviceMock},],
        }).compile();

        resolver = module.get(TodoResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('getAllTodos', () => {
        it('should return all todos', () => {
            const mockTodos = [{id: 1, title: 'Test Todo', completed: false}];
            serviceMock.setElements(mockTodos);
            const todos = resolver.getAllTodos();
            expect(serviceMock.getAllTodos).toHaveBeenCalled();
            expect(todos).toEqual(mockTodos);
        });
    });

    describe('createTodo', () => {
        it('should create new todo', () => {
            const mockTodo = {id: 1, title: 'Test Todo', completed: false};
            serviceMock.setElement(mockTodo);
            const initialLength = serviceMock.elements.length;
            const newTodo = resolver.createTodo('Test Todo');
            expect(serviceMock.createTodo).toHaveBeenCalled();
            expect(serviceMock.elements.length).toBe(initialLength + 1);
            expect(newTodo).toEqual(mockTodo);
        })
    })

    describe('updateTodo', () => {
        it('should update todo', () => {
            const mockTodos = [{id: 1, title: 'Test Todo', completed: false}];
            serviceMock.setElements(mockTodos);
            const updatedTodo = resolver.updateTodo(1, true);
            expect(serviceMock.updateTodo).toHaveBeenCalled();
            expect(updatedTodo.completed).toBeTruthy();
        })

        it('should throw NotFoundException', () => {
            serviceMock.setElements([]);
            expect(() => resolver.updateTodo(999, true)).toThrow(NotFoundException)
        })


    })
    describe('deleteTodo', () => {
        it('should delete todo', () => {
            const mockTodos = [{id: 1, title: 'Test Todo', completed: false}];
            serviceMock.setElements(mockTodos);
            const initialLength = serviceMock.elements.length;
            const deletedTodo = resolver.deleteTodo(1);
            expect(serviceMock.deleteTodo).toHaveBeenCalled();
            expect(serviceMock.elements.length).toBe(initialLength - 1);
            expect(deletedTodo).toBeTruthy();
        })

        it('should throw NotFoundException', () => {
            serviceMock.setElements([]);
            expect(() => resolver.updateTodo(999, true)).toThrow(NotFoundException)
        })
    })
})
