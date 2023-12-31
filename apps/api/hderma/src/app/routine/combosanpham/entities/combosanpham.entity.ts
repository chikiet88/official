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
import { environment } from '@taza-base/environments';
@Entity('hderma-combosanpham', {database:environment.DB_HDERMA.database, orderBy: { CreateAt: 'DESC' }})
export class CombosanphamEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Title: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota2: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default: '' })
    Cauhoi: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('[]')"})
    Dieukien: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('{}')"})
    DieukienThem: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('[]')"})
    Sanpham: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('[]')"})
    Combo: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('[]')"})
    Groups: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('{}')"})
    Hinhanh: string;
    @Column({ default: 0 })
    Diem: number;
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
