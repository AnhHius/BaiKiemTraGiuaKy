import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Room } from '../room/room.entity';
import { Staff } from '../staff/staff.entity';
import { Invoice } from '../invoice/invoice.entity';

export type BookingStatus = 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'room_id' })
  roomId: number;

  @Column({ name: 'staff_id', nullable: true })
  staffId: number;

  @Column({ name: 'check_in', type: 'date' })
  checkIn: string;

  @Column({ name: 'check_out', type: 'date' })
  checkOut: string;

  @Column({ name: 'total_price', type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalPrice: number;

  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'], default: 'pending' })
  status: BookingStatus;

  @Column({ type: 'text', nullable: true })
  note: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.bookings)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Room, (room) => room.bookings)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => Staff, (staff) => staff.bookings)
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;

  @OneToMany(() => Invoice, (invoice) => invoice.booking)
  invoices: Invoice[];
}
