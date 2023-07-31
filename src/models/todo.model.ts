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
