import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, UpdateRoomDto } from './room.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // POST /rooms - Tạo phòng mới
  @Post()
  create(@Body() dto: CreateRoomDto) {
    return this.roomService.create(dto);
  }

  // GET /rooms - Lấy tất cả phòng
  // GET /rooms?status=available - Lọc theo trạng thái
  @Get()
  findAll(@Query('status') status?: string) {
    if (status) return this.roomService.findByStatus(status);
    return this.roomService.findAll();
  }

  // GET /rooms/:id - Lấy thông tin 1 phòng
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  // PUT /rooms/:id - Cập nhật phòng
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
    return this.roomService.update(+id, dto);
  }

  // DELETE /rooms/:id - Xóa phòng
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
