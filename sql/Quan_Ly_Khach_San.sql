-- ============================================
-- HỆ THỐNG QUẢN LÝ KHÁCH SẠN
-- File: Quan_Ly_Khach_San.sql
-- Database: MySQL
-- ============================================

CREATE DATABASE IF NOT EXISTS quan_ly_khach_san
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE quan_ly_khach_san;

-- ============================================
-- BẢNG: NHÂN VIÊN (Staff)
-- ============================================
CREATE TABLE staff (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  full_name   VARCHAR(100) NOT NULL,
  email       VARCHAR(100) NOT NULL UNIQUE,
  phone       VARCHAR(20),
  position    ENUM('manager','receptionist','housekeeping','security') NOT NULL DEFAULT 'receptionist',
  salary      DECIMAL(12,2) DEFAULT 0,
  hire_date   DATE NOT NULL,
  is_active   TINYINT(1) DEFAULT 1,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- BẢNG: PHÒNG (Room)
-- ============================================
CREATE TABLE room (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  room_number   VARCHAR(10) NOT NULL UNIQUE,
  room_type     ENUM('single','double','suite','deluxe') NOT NULL DEFAULT 'single',
  price_per_night DECIMAL(12,2) NOT NULL,
  floor         INT NOT NULL DEFAULT 1,
  capacity      INT NOT NULL DEFAULT 1,
  status        ENUM('available','occupied','maintenance') NOT NULL DEFAULT 'available',
  description   TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- BẢNG: KHÁCH HÀNG (Customer)
-- ============================================
CREATE TABLE customer (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  full_name     VARCHAR(100) NOT NULL,
  email         VARCHAR(100) UNIQUE,
  phone         VARCHAR(20) NOT NULL,
  id_card       VARCHAR(20) UNIQUE,
  nationality   VARCHAR(50) DEFAULT 'Việt Nam',
  address       TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- BẢNG: ĐẶT PHÒNG (Booking)
-- ============================================
CREATE TABLE booking (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  customer_id   INT NOT NULL,
  room_id       INT NOT NULL,
  staff_id      INT,
  check_in      DATE NOT NULL,
  check_out     DATE NOT NULL,
  total_price   DECIMAL(12,2) DEFAULT 0,
  status        ENUM('pending','confirmed','checked_in','checked_out','cancelled') NOT NULL DEFAULT 'pending',
  note          TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_booking_customer FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
  CONSTRAINT fk_booking_room     FOREIGN KEY (room_id)     REFERENCES room(id)     ON DELETE CASCADE,
  CONSTRAINT fk_booking_staff    FOREIGN KEY (staff_id)    REFERENCES staff(id)    ON DELETE SET NULL
);

-- ============================================
-- BẢNG: DỊCH VỤ (Service)
-- ============================================
CREATE TABLE service (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  description TEXT,
  price       DECIMAL(12,2) NOT NULL DEFAULT 0,
  category    ENUM('food','spa','transport','laundry','other') NOT NULL DEFAULT 'other',
  is_active   TINYINT(1) DEFAULT 1,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- BẢNG: HÓA ĐƠN (Invoice)
-- ============================================
CREATE TABLE invoice (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  booking_id    INT NOT NULL,
  staff_id      INT,
  room_charge   DECIMAL(12,2) DEFAULT 0,
  service_charge DECIMAL(12,2) DEFAULT 0,
  discount      DECIMAL(12,2) DEFAULT 0,
  total_amount  DECIMAL(12,2) DEFAULT 0,
  payment_method ENUM('cash','card','transfer') NOT NULL DEFAULT 'cash',
  payment_status ENUM('unpaid','paid','refunded') NOT NULL DEFAULT 'unpaid',
  issued_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_invoice_booking FOREIGN KEY (booking_id) REFERENCES booking(id) ON DELETE CASCADE,
  CONSTRAINT fk_invoice_staff   FOREIGN KEY (staff_id)   REFERENCES staff(id)   ON DELETE SET NULL
);

-- ============================================
-- BẢNG TRUNG GIAN: Hóa đơn - Dịch vụ
-- ============================================
CREATE TABLE invoice_service (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  invoice_id  INT NOT NULL,
  service_id  INT NOT NULL,
  quantity    INT DEFAULT 1,
  unit_price  DECIMAL(12,2) NOT NULL,
  CONSTRAINT fk_is_invoice FOREIGN KEY (invoice_id) REFERENCES invoice(id) ON DELETE CASCADE,
  CONSTRAINT fk_is_service FOREIGN KEY (service_id) REFERENCES service(id) ON DELETE CASCADE
);

-- ============================================
-- DỮ LIỆU MẪU
-- ============================================

INSERT INTO staff (full_name, email, phone, position, salary, hire_date) VALUES
('Nguyễn Văn An',   'an.nv@khachsan.com',   '0901000001', 'manager',       15000000, '2020-01-10'),
('Trần Thị Bình',   'binh.tt@khachsan.com', '0901000002', 'receptionist',   8000000, '2021-03-15'),
('Lê Văn Cường',    'cuong.lv@khachsan.com','0901000003', 'housekeeping',   6000000, '2022-06-01'),
('Phạm Thị Dung',   'dung.pt@khachsan.com', '0901000004', 'receptionist',   8000000, '2021-09-20'),
('Hoàng Văn Em',    'em.hv@khachsan.com',   '0901000005', 'security',       7000000, '2023-01-05');

INSERT INTO room (room_number, room_type, price_per_night, floor, capacity, status, description) VALUES
('101', 'single',  500000, 1, 1, 'available',   'Phòng đơn view sân vườn'),
('102', 'single',  500000, 1, 1, 'occupied',    'Phòng đơn tầng 1'),
('201', 'double',  900000, 2, 2, 'available',   'Phòng đôi view hồ bơi'),
('202', 'double',  900000, 2, 2, 'available',   'Phòng đôi tầng 2'),
('301', 'suite',  2000000, 3, 3, 'available',   'Suite cao cấp view thành phố'),
('302', 'deluxe', 1500000, 3, 2, 'maintenance', 'Phòng deluxe đang bảo trì');

INSERT INTO customer (full_name, email, phone, id_card, nationality, address) VALUES
('Nguyễn Thị Hoa',  'hoa.nt@gmail.com',  '0912000001', '001234567890', 'Việt Nam', 'Hà Nội'),
('Trần Văn Minh',   'minh.tv@gmail.com', '0912000002', '001234567891', 'Việt Nam', 'TP. HCM'),
('Lê Thị Lan',      'lan.lt@gmail.com',  '0912000003', '001234567892', 'Việt Nam', 'Đà Nẵng'),
('John Smith',      'john@email.com',    '0912000004', 'P12345678',    'USA',      'New York'),
('Yuki Tanaka',     'yuki@email.com',    '0912000005', 'JP98765432',   'Japan',    'Tokyo');

INSERT INTO booking (customer_id, room_id, staff_id, check_in, check_out, total_price, status) VALUES
(1, 2, 2, '2025-06-01', '2025-06-05', 2000000, 'checked_out'),
(2, 3, 2, '2025-06-10', '2025-06-12', 1800000, 'confirmed'),
(3, 1, 4, '2025-06-15', '2025-06-17', 1000000, 'pending'),
(4, 5, 2, '2025-06-20', '2025-06-25', 10000000,'confirmed'),
(5, 4, 4, '2025-07-01', '2025-07-03', 1800000, 'pending');

INSERT INTO service (name, description, price, category) VALUES
('Bữa sáng buffet', 'Buffet sáng đầy đủ dinh dưỡng', 150000, 'food'),
('Spa toàn thân',   'Liệu trình spa thư giãn 90 phút', 500000, 'spa'),
('Đưa đón sân bay', 'Xe đưa đón sân bay khứ hồi',     300000, 'transport'),
('Giặt ủi',         'Dịch vụ giặt ủi trong ngày',      80000, 'laundry'),
('Phòng gym',       'Sử dụng phòng gym cả ngày',        100000, 'other');

INSERT INTO invoice (booking_id, staff_id, room_charge, service_charge, discount, total_amount, payment_method, payment_status) VALUES
(1, 2, 2000000, 650000, 0,      2650000, 'cash',     'paid'),
(2, 2, 1800000, 300000, 100000, 2000000, 'card',     'unpaid'),
(4, 2, 10000000,1500000,500000, 11000000,'transfer', 'paid');

INSERT INTO invoice_service (invoice_id, service_id, quantity, unit_price) VALUES
(1, 1, 4, 150000),
(1, 4, 1, 80000),
(2, 3, 1, 300000),
(3, 2, 2, 500000),
(3, 1, 5, 150000);