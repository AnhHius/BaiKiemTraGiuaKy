# 🏨 Hệ Thống Quản Lý Khách Sạn
> Framework: NestJS | Database: MySQL | ORM: TypeORM

---

## 📋 Mô Tả Dự Án

Hệ thống quản lý khách sạn được xây dựng bằng **NestJS** theo kiến trúc module hóa, hỗ trợ đầy đủ các nghiệp vụ: quản lý phòng, khách hàng, đặt phòng, nhân viên, dịch vụ và hóa đơn.

---

## 🗂 Cấu Trúc Dự Án

```
hotel-management/
├── sql/
│   └── Quan_Ly_Khach_San.sql        # CSDL MySQL đầy đủ + dữ liệu mẫu
├── src/
│   ├── app.module.ts                 # Module gốc, cấu hình TypeORM
│   └── modules/
│       ├── room/                     # Quản lý Phòng
│       │   ├── room.entity.ts
│       │   ├── room.dto.ts
│       │   ├── room.service.ts
│       │   ├── room.controller.ts
│       │   └── room.module.ts
│       ├── customer/                 # Quản lý Khách Hàng
│       ├── booking/                  # Quản lý Đặt Phòng
│       ├── staff/                    # Quản lý Nhân Viên
│       ├── service/                  # Quản lý Dịch Vụ
│       └── invoice/                  # Quản lý Hóa Đơn
└── README.md
```

---

## 🗄 Cơ Sở Dữ Liệu

### Các bảng chính:

| Bảng | Mô tả |
|------|-------|
| `room` | Thông tin phòng khách sạn |
| `customer` | Thông tin khách hàng |
| `booking` | Đặt phòng |
| `staff` | Nhân viên |
| `service` | Dịch vụ khách sạn |
| `invoice` | Hóa đơn thanh toán |
| `invoice_service` | Dịch vụ trong hóa đơn |

### Chạy file SQL:
```bash
mysql -u root -p < sql/Quan_Ly_Khach_San.sql
```

---

## 🚀 Cài Đặt & Chạy

### Yêu cầu:
- Node.js >= 18
- MySQL >= 8.0
- npm hoặc yarn

### Cài đặt:
```bash
npm install @nestjs/common @nestjs/core @nestjs/platform-express
npm install @nestjs/typeorm typeorm mysql2
npm install reflect-metadata rxjs
```

### Cấu hình biến môi trường (`.env`):
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_password
DB_NAME=quan_ly_khach_san
```

### Chạy ứng dụng:
```bash
npm run start:dev
```

---

## 📡 API Endpoints

### 🛏 Phòng (`/rooms`)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/rooms` | Tạo phòng mới |
| GET | `/rooms` | Lấy danh sách tất cả phòng |
| GET | `/rooms?status=available` | Lọc phòng theo trạng thái |
| GET | `/rooms/:id` | Lấy thông tin 1 phòng |
| PUT | `/rooms/:id` | Cập nhật thông tin phòng |
| DELETE | `/rooms/:id` | Xóa phòng |

### 👤 Khách Hàng (`/customers`)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/customers` | Tạo khách hàng mới |
| GET | `/customers` | Lấy danh sách khách hàng |
| GET | `/customers/:id` | Lấy thông tin 1 khách hàng |
| PUT | `/customers/:id` | Cập nhật khách hàng |
| DELETE | `/customers/:id` | Xóa khách hàng |

### 📅 Đặt Phòng (`/bookings`)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/bookings` | Tạo đặt phòng mới |
| GET | `/bookings` | Lấy danh sách đặt phòng |
| GET | `/bookings?status=pending` | Lọc theo trạng thái |
| GET | `/bookings/:id` | Lấy chi tiết đặt phòng |
| PUT | `/bookings/:id` | Cập nhật đặt phòng |
| DELETE | `/bookings/:id` | Xóa đặt phòng |

### 👷 Nhân Viên (`/staff`)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/staff` | Thêm nhân viên mới |
| GET | `/staff` | Lấy danh sách nhân viên |
| GET | `/staff/:id` | Lấy thông tin 1 nhân viên |
| PUT | `/staff/:id` | Cập nhật nhân viên |
| DELETE | `/staff/:id` | Xóa nhân viên |

### 🛎 Dịch Vụ (`/services`)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/services` | Thêm dịch vụ mới |
| GET | `/services` | Lấy danh sách dịch vụ |
| GET | `/services/:id` | Lấy thông tin 1 dịch vụ |
| PUT | `/services/:id` | Cập nhật dịch vụ |
| DELETE | `/services/:id` | Xóa dịch vụ |

### 🧾 Hóa Đơn (`/invoices`)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/invoices` | Tạo hóa đơn mới |
| GET | `/invoices` | Lấy danh sách hóa đơn |
| GET | `/invoices/:id` | Lấy chi tiết hóa đơn |
| PUT | `/invoices/:id` | Cập nhật hóa đơn |
| DELETE | `/invoices/:id` | Xóa hóa đơn |

---

## 📌 Ví Dụ Request

### Tạo phòng mới:
```json
POST /rooms
{
  "roomNumber": "401",
  "roomType": "suite",
  "pricePerNight": 2500000,
  "floor": 4,
  "capacity": 3,
  "description": "Suite cao cấp view biển"
}
```

### Đặt phòng:
```json
POST /bookings
{
  "customerId": 1,
  "roomId": 3,
  "staffId": 2,
  "checkIn": "2025-07-10",
  "checkOut": "2025-07-15",
  "totalPrice": 4500000
}
```

---

## 👥 Phân Công Nhóm

| Thành viên | Đối tượng phụ trách |
|------------|---------------------|
| Sinh viên A | Room (Phòng) |
| Sinh viên B | Customer (Khách hàng) |
| Sinh viên C | Booking (Đặt phòng) |
| Sinh viên D | Staff (Nhân viên) |
| Sinh viên E | Service (Dịch vụ) |
| Sinh viên F | Invoice (Hóa đơn) |

---

## 📊 Activity Diagram

Xem file `diagrams/Activity_Diagram_CRUD.svg` để xem lưu đồ thuật toán CRUD cho tất cả các đối tượng.

---

## 🛠 Công Nghệ Sử Dụng

- **NestJS** - Backend framework
- **TypeORM** - ORM kết nối database
- **MySQL** - Hệ quản trị cơ sở dữ liệu
- **TypeScript** - Ngôn ngữ lập trình
