import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  async create(dto: CreateBookingDto): Promise<Booking> {
    const booking = this.bookingRepo.create(dto);
    return await this.bookingRepo.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingRepo.find({
      relations: ['customer', 'room', 'staff'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['customer', 'room', 'staff', 'invoices'],
    });
    if (!booking) throw new NotFoundException(`Không tìm thấy đặt phòng với ID: ${id}`);
    return booking;
  }

  async findByStatus(status: string): Promise<Booking[]> {
    return await this.bookingRepo.find({
      where: { status: status as any },
      relations: ['customer', 'room'],
    });
  }

  async update(id: number, dto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);
    Object.assign(booking, dto);
    return await this.bookingRepo.save(booking);
  }

  async remove(id: number): Promise<{ message: string }> {
    const booking = await this.findOne(id);
    await this.bookingRepo.remove(booking);
    return { message: `Đã xóa đặt phòng ID: ${id} thành công` };
  }
}
