"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_entity_1 = require("./invoice.entity");
let InvoiceService = class InvoiceService {
    constructor(invoiceRepo) {
        this.invoiceRepo = invoiceRepo;
    }
    async create(dto) {
        const invoice = this.invoiceRepo.create(dto);
        return await this.invoiceRepo.save(invoice);
    }
    async findAll() {
        return await this.invoiceRepo.find({
            relations: { booking: true, staff: true },
            order: { issuedAt: 'DESC' },
        });
    }
    async findOne(id) {
        const invoice = await this.invoiceRepo.findOne({
            where: { id },
            relations: { booking: { customer: true, room: true }, staff: true },
        });
        if (!invoice)
            throw new common_1.NotFoundException(`Không tìm thấy hóa đơn với ID: ${id}`);
        return invoice;
    }
    async update(id, dto) {
        const invoice = await this.findOne(id);
        Object.assign(invoice, dto);
        return await this.invoiceRepo.save(invoice);
    }
    async remove(id) {
        const invoice = await this.findOne(id);
        await this.invoiceRepo.remove(invoice);
        return { message: `Đã xóa hóa đơn ID: ${id} thành công` };
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map