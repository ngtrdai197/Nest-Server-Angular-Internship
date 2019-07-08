import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { constants } from './constants';
@Module({
  imports: [
    UserModule,
    OrderDetailsModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    MongooseModule.forRoot(`mongodb://localhost/${constants.DATABASE}`)
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
