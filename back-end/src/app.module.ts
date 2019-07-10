import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { constants } from './constants';
import { CommonModule } from './common/common.module';
import { MulterModule } from '@nestjs/platform-express';
import { ParserMiddleware } from './common/auth/parser.middleware';
@Module({
  imports: [
    UserModule,
    OrderDetailsModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    CommonModule,
    MulterModule.register({
      dest: './upload'
    }),
    MongooseModule.forRoot(`mongodb+srv://${constants.User}:${constants.Password}@cluster0-esass.mongodb.net/${constants.DATABASENAME}?retryWrites=true&w=majority`)
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(ParserMiddleware).forRoutes({
//       path: '*', method: RequestMethod.ALL
//     })
//   }
// }


