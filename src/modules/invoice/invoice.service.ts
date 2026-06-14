import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto, UpdateInvoiceDto } from './invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
  ) {}

  async create(dto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = this.invoiceRepo.create(dto);
    return await this.invoiceRepo.save(invoice);
  }

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceRepo.find({
      relations: { booking: true, staff: true },
      order: { issuedAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepo.findOne({
      where: { id },
      relations: { booking: { customer: true, room: true }, staff: true },
    });
    if (!invoice) throw new NotFoundException(`Không tìm thấy hóa đơn với ID: ${id}`);
    return invoice;
  }

  async update(id: number, dto: UpdateInvoiceDto): Promise<Invoice> {
    const invoice = await this.findOne(id);
    Object.assign(invoice, dto);
    return await this.invoiceRepo.save(invoice);
  }

  async remove(id: number): Promise<{ message: string }> {
    const invoice = await this.findOne(id);
    await this.invoiceRepo.remove(invoice);
    return { message: `Đã xóa hóa đơn ID: ${id} thành công` };
  }
}
