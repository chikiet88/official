import { environment } from '@taza-base/environments';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
@Entity('hderma_notify', {database:environment.DB_USERS.database, orderBy: { Ngaytao: 'DESC' } })
export class NotifyTokkenEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  device_type: string;
  @Column()
  notify_token: string;
  @Column({default:1})
  Sapxep:number
  @Column({default:true})
  Trangthai: boolean;
  @Column({default:true})
  Status: boolean;
  @Column({collation: "utf8_general_ci"})
  Ghichu: string;
  @Column({collation: "utf8_general_ci"})
  idTao: string;
  @CreateDateColumn()
  Ngaytao: Date;
}