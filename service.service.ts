import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HotelService } from './service.entity';
import { CreateServiceDto, UpdateServiceDto } from './service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(HotelService)
    private readonly serviceRepo: Repository<HotelService>,
  ) {}

  async create(dto: CreateServiceDto): Promise<HotelService> {
    const service = this.serviceRepo.create(dto);
    return await this.serviceRepo.save(service);
  }

  async findAll(): Promise<HotelService[]> {
    return await this.serviceRepo.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number): Promise<HotelService> {
    const service = await this.serviceRepo.findOne({ where: { id } });
    if (!service) throw new NotFoundException(`Không tìm thấy dịch vụ với ID: ${id}`);
    return service;
  }

  async update(id: number, dto: UpdateServiceDto): Promise<HotelService> {
    const service = await this.findOne(id);
    Object.assign(service, dto);
    return await this.serviceRepo.save(service);
  }

  async remove(id: number): Promise<{ message: string }> {
    const service = await this.findOne(id);
    await this.serviceRepo.remove(service);
    return { message: `Đã xóa dịch vụ ${service.name} thành công` };
  }
}
