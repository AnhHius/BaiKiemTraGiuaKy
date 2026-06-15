import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from './modules/room/room.module';
import { CustomerModule } from './modules/customer/customer.module';
import { BookingModule } from './modules/booking/booking.module';
import { StaffModule } from './modules/staff/staff.module';
import { ServiceModule } from './modules/service/service.module';
import { InvoiceModule } from './modules/invoice/invoice.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'app',
      password: 'app',
      database: 'quan_ly_khach_san',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      charset: 'utf8mb4',
    }),
    RoomModule,
    CustomerModule,
    BookingModule,
    StaffModule,
    ServiceModule,
    InvoiceModule,
  ],
})
export class AppModule {}
