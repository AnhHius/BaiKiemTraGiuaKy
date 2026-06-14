import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Booking } from '../booking/booking.entity';

export type RoomType = 'single' | 'double' | 'suite' | 'deluxe';
export type RoomStatus = 'available' | 'occupied' | 'maintenance';

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'room_number', length: 10, unique: true })
  roomNumber: string;

  @Column({ name: 'room_type', type: 'enum', enum: ['single', 'double', 'suite', 'deluxe'], default: 'single' })
  roomType: RoomType;

  @Column({ name: 'price_per_night', type: 'decimal', precision: 12, scale: 2 })
  pricePerNight: number;

  @Column({ default: 1 })
  floor: number;

  @Column({ default: 1 })
  capacity: number;

  @Column({ type: 'enum', enum: ['available', 'occupied', 'maintenance'], default: 'available' })
  status: RoomStatus;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];
}
