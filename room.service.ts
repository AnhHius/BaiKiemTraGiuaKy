import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto, UpdateRoomDto } from './room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
  ) {}

  // CREATE - Tạo phòng mới
  async create(dto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepo.create(dto);
    return await this.roomRepo.save(room);
  }

  // READ ALL - Lấy danh sách tất cả phòng
  async findAll(): Promise<Room[]> {
    return await this.roomRepo.find({ order: { roomNumber: 'ASC' } });
  }

  // READ ONE - Lấy thông tin 1 phòng theo ID
  async findOne(id: number): Promise<Room> {
    const room = await this.roomRepo.findOne({ where: { id } });
    if (!room) throw new NotFoundException(`Không tìm thấy phòng với ID: ${id}`);
    return room;
  }

  // READ - Tìm phòng theo trạng thái
  async findByStatus(status: string): Promise<Room[]> {
    return await this.roomRepo.find({ where: { status: status as any } });
  }

  // UPDATE - Cập nhật thông tin phòng
  async update(id: number, dto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);
    Object.assign(room, dto);
    return await this.roomRepo.save(room);
  }

  // DELETE - Xóa phòng
  async remove(id: number): Promise<{ message: string }> {
    const room = await this.findOne(id);
    await this.roomRepo.remove(room);
    return { message: `Đã xóa phòng số ${room.roomNumber} thành công` };
  }
}
