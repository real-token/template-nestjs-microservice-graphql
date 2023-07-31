import {NotFoundException} from "@nestjs/common";

export class TodoServiceMock {
    element: any = null;
    elements: any[] = [];

    getAllTodos = jest.fn(() => this.elements);

    createTodo = jest.fn((title: string) => {
        const todo = {
            id: this.elements.length + 1,
            title,
            completed: false,
        };
        this.elements.push(todo);
        return todo;
    });

    updateTodo = jest.fn((id: number, completed: boolean) => {
        const todo = this.elements.find(todo => todo.id === id);
        if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
        todo.completed = completed;
        return todo;
    });

    deleteTodo = jest.fn((id: number) => {
        const index = this.elements.findIndex(todo => todo.id === id);
        if (index === -1) throw new NotFoundException(`Todo with id ${id} not found`);
        this.elements.splice(index, 1);
        return true;
    });

    setElement(element: any) {
        this.element = element;
    }

    setElements(elements: any[]) {
        this.elements = elements;
    }
}
