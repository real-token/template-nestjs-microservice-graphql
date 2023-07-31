# NestJS GraphQL Template

This project is a ready-to-use template for building applications with NestJS, integrating GraphQL as well. It's designed to provide a robust and flexible foundation, enabling rapid and consistent development. The template includes pre-configured setups for testing, Docker integration, and follows best practices for modern application development. Use this template as a starting point for your own projects, or as a reference for incorporating specific features into your existing architecture.

## Table of contents

- [Installation](#installation)
- [Utilisation](#utilisation)
- [Running with Docker](#running-with-docker)
- [Tests](#tests)
- [NestJS explanation](#nestjs-explanation)

## Installation

First to install and run the project locally you'll need to install deps :

```bash
npm install
```

## Utilisation

To use this project as a template you'll just have to change the `.git` folder for your new repo.

### Available commands

- `npm run start:dev` : Run the API for dev env

## Running with Docker

This project already have a Dockerfile, so you can start your API using Docker.
First go to root, where you have the Dockerfile, then :

```bash
docker build -t realt-template-api:latest .
docker run -d -p 4242:4242 realt-template-api:latest
```

## Tests

Expliquez comment exécuter les tests pour ce projet.

```bash
- npm run test:resolvers # Run tests only for resolvers
- npm run test:services # Run tests only for services
- npm run tests # Run all tests
```

## NestJS explanation

### Resolvers

In this template, resolvers are used to handle the GraphQL queries and mutations. 
They act as the gateways for fetching the data and executing the required logic, translating client queries into understandable instructions for the application. By abstracting the underlying complexities, resolvers enable a smooth interaction with the data model and enhance the flexibility of the GraphQL schema.

Exemple :

```typescript
@Resolver('Todo')
export class TodoResolver {
    constructor(private readonly todoService: TodoService) {}
    
    @Query(returns => [Todo], { name: 'getAllTodos' })
    getAllTodos(): Promise<Todo[]> {
    return this.todoService.findAll();
    }
}
```

### Services

Services in this context are classes that encapsulate specific business logic, processes, or computations. They provide reusable methods that can be called by controllers, resolvers, or other services. This helps in maintaining a clean and maintainable codebase, promoting a clear separation of concerns. By isolating functionality into services, the application can be more easily extended, tested, and modified.

Exemple :

```typescript
@Injectable()
export class TodoService {
    constructor() {}

    findAll(): Promise<Todo[]> {
        return this.todoRepository.find();
    }
}
```

### Modules

Modules are the organizational units within the NestJS framework. They encapsulate related functionalities and components, such as controllers, providers, and services, into cohesive groups. This helps in keeping the application's structure well-organized and scalable. Modules enable the efficient organization of code, and they facilitate dependency injection, allowing for more maintainable and modular development.

Exemple :

```typescript
@Module({
    imports: [],
    providers: [TodoService, TodoResolver],
})
export class TodoModule {}
```

### Models

Models are the representations of the entities within the application and are typically used to define the structure of data in the database. They form the core of the application's business logic, describing the attributes, relationships, and constraints of the data. By utilizing models, the application can ensure consistency and integrity in handling data across various parts of the system. They serve as the blueprint for both database operations and business logic, streamlining development and increasing maintainability.

Exemple :
```typescript
import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class Todo {
    
    @Field(type => Number)
    id: number;
    
    @Field(type => String)
    title: string;
    
    @Field(type => Boolean)
    completed: boolean;
}
```