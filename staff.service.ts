import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './staff.entity';
import { CreateStaffDto, UpdateStaffDto } from './staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepo: Repository<Staff>,
  ) {}

  async create(dto: CreateStaffDto): Promise<Staff> {
    const staff = this.staffRepo.create(dto);
    return await this.staffRepo.save(staff);
  }

  async findAll(): Promise<Staff[]> {
    return await this.staffRepo.find({ order: { fullName: 'ASC' } });
  }

  async findOne(id: number): Promise<Staff> {
    const staff = await this.staffRepo.findOne({ where: { id } });
    if (!staff) throw new NotFoundException(`Không tìm thấy nhân viên với ID: ${id}`);
    return staff;
  }

  async update(id: number, dto: UpdateStaffDto): Promise<Staff> {
    const staff = await this.findOne(id);
    Object.assign(staff, dto);
    return await this.staffRepo.save(staff);
  }

  async remove(id: number): Promise<{ message: string }> {
    const staff = await this.findOne(id);
    await this.staffRepo.remove(staff);
    return { message: `Đã xóa nhân viên ${staff.fullName} thành công` };
  }
}
