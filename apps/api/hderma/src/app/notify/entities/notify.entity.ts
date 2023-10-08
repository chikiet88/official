import { environment } from '@taza-base/environments';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
  } from 'typeorm';
  @Entity('hderma_notify', {database:environment.DB_USERS.database, orderBy: { Ngaytao: 'DESC' } })
  export class NotifyEntity {
      @PrimaryGeneratedColumn("uuid")
      id: string;
      @Column({collation: "utf8_general_ci"})
      idUser: string;
      @Column({collation: "utf8_general_ci"})
      Type: string;
      @Column({collation: "utf8_general_ci"})
      Message: string;
      @Column({collation: "utf8_general_ci"})
      Link: string;
      @Column({default:1})
      Sapxep:number
      @Column({default:true})
      Trangthai: boolean;
      @Column({default:false})
      Status: boolean;
      @Column({collation: "utf8_general_ci"})
      Ghichu: string;
      @Column({collation: "utf8_general_ci"})
      idTao: string;
      @CreateDateColumn()
      Ngaytao: Date;
   }
  