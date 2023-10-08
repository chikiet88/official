import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { GiangvienEntity } from '../../giangvien/entities/giangvien.entity';
import { UsersEntity } from '../../users/entities/user.entity';
import { environment } from '@taza-base/environments';
@Entity('comment',{database:environment.DB_TIMONA.database, orderBy: { CreateAt: 'DESC' } })
export class SubcommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ collation: "utf8_general_ci", default: '' })
  Comment: string;
  @Column()
  idGV: string;
  @Column()
  idUser: string;
  @Column({ default: 5 })
  Rate: number;
  @Column({ default: '' })
  pid: string;
  @Column({ default: false })
  Tinhtrang: boolean;
  // @ManyToOne(
  //   () => UsersEntity,
  //   (user) => user.Comments,
  // )
  @JoinColumn({ name: 'idUser' })
  User: UsersEntity;
  @ManyToOne(
    () => GiangvienEntity,
    (giangvien) => giangvien.Comments,
  )
  @JoinColumn({ name: 'idGV' })
  Giangvien: GiangvienEntity;
  @Column({ default: 1 })
  Ordering: number;
  @Column({ default: 0 })
  Trangthai: number;
  @CreateDateColumn()
  CreateAt: Date;
  @Column({ nullable: true })
  idTao: string;
}
