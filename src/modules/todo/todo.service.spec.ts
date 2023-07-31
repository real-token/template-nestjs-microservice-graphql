import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';

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

    // ... autres tests
});
