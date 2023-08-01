import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {YogaDriver, YogaDriverConfig} from "@graphql-yoga/nestjs";
import {GraphQLModule} from "@nestjs/graphql";
import {ConfigModule} from "@nestjs/config";
import {TodoModule} from "./modules/todo/todo.module";
import {IpDomainFilterMiddleware} from "./middlewares/ip-domain-filter.middleware";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        GraphQLModule.forRoot<YogaDriverConfig>({
            driver: YogaDriver,
            autoSchemaFile: true,
        }),
        TodoModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(IpDomainFilterMiddleware)
            .forRoutes({path: '*', method: RequestMethod.ALL}); // Appliquer à toutes les routes
    }
}
