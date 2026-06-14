import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Booking } from '../booking/booking.entity';
import { Staff } from '../staff/staff.entity';

export type PaymentMethod = 'cash' | 'card' | 'transfer';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';

@Entity('invoice')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'booking_id' })
  bookingId: number;

  @Column({ name: 'staff_id', nullable: true })
  staffId: number;

  @Column({ name: 'room_charge', type: 'decimal', precision: 12, scale: 2, default: 0 })
  roomCharge: number;

  @Column({ name: 'service_charge', type: 'decimal', precision: 12, scale: 2, default: 0 })
  serviceCharge: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  discount: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ name: 'payment_method', type: 'enum', enum: ['cash', 'card', 'transfer'], default: 'cash' })
  paymentMethod: PaymentMethod;

  @Column({ name: 'payment_status', type: 'enum', enum: ['unpaid', 'paid', 'refunded'], default: 'unpaid' })
  paymentStatus: PaymentStatus;

  @CreateDateColumn({ name: 'issued_at' })
  issuedAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Booking, (booking) => booking.invoices)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @ManyToOne(() => Staff, (staff) => staff.invoices)
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;
}
