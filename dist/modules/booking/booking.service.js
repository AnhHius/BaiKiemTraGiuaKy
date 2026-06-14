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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./booking.entity");
let BookingService = class BookingService {
    constructor(bookingRepo) {
        this.bookingRepo = bookingRepo;
    }
    async create(dto) {
        const booking = this.bookingRepo.create(dto);
        return await this.bookingRepo.save(booking);
    }
    async findAll() {
        return await this.bookingRepo.find({
            relations: { customer: true, room: true, staff: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const booking = await this.bookingRepo.findOne({
            where: { id },
            relations: { customer: true, room: true, staff: true, invoices: true },
        });
        if (!booking)
            throw new common_1.NotFoundException(`Không tìm thấy đặt phòng với ID: ${id}`);
        return booking;
    }
    async findByStatus(status) {
        return await this.bookingRepo.find({
            where: { status: status },
            relations: { customer: true, room: true },
        });
    }
    async update(id, dto) {
        const booking = await this.findOne(id);
        Object.assign(booking, dto);
        return await this.bookingRepo.save(booking);
    }
    async remove(id) {
        const booking = await this.findOne(id);
        await this.bookingRepo.remove(booking);
        return { message: `Đã xóa đặt phòng ID: ${id} thành công` };
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookingService);
//# sourceMappingURL=booking.service.js.map