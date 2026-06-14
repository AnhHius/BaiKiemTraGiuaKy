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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_entity_1 = require("./service.entity");
let ServiceService = class ServiceService {
    constructor(serviceRepo) {
        this.serviceRepo = serviceRepo;
    }
    async create(dto) {
        const service = this.serviceRepo.create(dto);
        return await this.serviceRepo.save(service);
    }
    async findAll() {
        return await this.serviceRepo.find({ order: { name: 'ASC' } });
    }
    async findOne(id) {
        const service = await this.serviceRepo.findOne({ where: { id } });
        if (!service)
            throw new common_1.NotFoundException(`Không tìm thấy dịch vụ với ID: ${id}`);
        return service;
    }
    async update(id, dto) {
        const service = await this.findOne(id);
        Object.assign(service, dto);
        return await this.serviceRepo.save(service);
    }
    async remove(id) {
        const service = await this.findOne(id);
        await this.serviceRepo.remove(service);
        return { message: `Đã xóa dịch vụ ${service.name} thành công` };
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.HotelService)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiceService);
//# sourceMappingURL=service.service.js.map