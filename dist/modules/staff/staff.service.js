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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const staff_entity_1 = require("./staff.entity");
let StaffService = class StaffService {
    constructor(staffRepo) {
        this.staffRepo = staffRepo;
    }
    async create(dto) {
        const staff = this.staffRepo.create(dto);
        return await this.staffRepo.save(staff);
    }
    async findAll() {
        return await this.staffRepo.find({ order: { fullName: 'ASC' } });
    }
    async findOne(id) {
        const staff = await this.staffRepo.findOne({ where: { id } });
        if (!staff)
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên với ID: ${id}`);
        return staff;
    }
    async update(id, dto) {
        const staff = await this.findOne(id);
        Object.assign(staff, dto);
        return await this.staffRepo.save(staff);
    }
    async remove(id) {
        const staff = await this.findOne(id);
        await this.staffRepo.remove(staff);
        return { message: `Đã xóa nhân viên ${staff.fullName} thành công` };
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StaffService);
//# sourceMappingURL=staff.service.js.map