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
import { BaivietEntity } from '../../baiviet/entities/baiviet.entity';
import { environment } from 'apps/site/hderma/src/environments/environments';

@Entity('danhmuc', {database:environment.DB_TIMONA.database, orderBy: { CreateAt: 'DESC' } })
export class DanhmucEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Title: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota: string;
    @Column({ default: '' })
    Slug: string;
    @Column({ default: '' })
    Type: string;
    @OneToMany(() => BaivietEntity, (baiviet) => baiviet.Danhmuc, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Baiviets: BaivietEntity[];
    @Column({ default: '' })
    pid: string;
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
