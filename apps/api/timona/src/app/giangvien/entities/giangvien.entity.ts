import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    Index,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    OneToMany,
} from 'typeorm';
import { DanhmucEntity } from '../../danhmuc/entities/danhmuc.entity';
import { SubcommentEntity } from '../../subcomment/entities/subcomment.entity';
import { environment } from 'apps/site/hderma/src/environments/environments';

@Entity('giangvien', {database:environment.DB_TIMONA.database, orderBy: { CreateAt: 'DESC' } })
export class GiangvienEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Name: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Chucvu: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota: string;
    @Column({ default: '' })
    Image: string;
    @Column({ default: '' })
    Image1: string;
    @OneToMany(() => SubcommentEntity, (comment) => comment.Giangvien, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Comments: SubcommentEntity[];
    @Column({ default: '' })
    Loaibaiviet: string;
    @Column({ default: 0 })
    Tinhtrang: number;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Trangthai: number;
    @CreateDateColumn()
    CreateAt: Date;
    @Column({ nullable: true })
    idTao: string;
}
