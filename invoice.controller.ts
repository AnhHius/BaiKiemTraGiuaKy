import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from './invoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() dto: CreateInvoiceDto) {
    return this.invoiceService.create(dto);
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
