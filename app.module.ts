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
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'quan_ly_khach_san',
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
