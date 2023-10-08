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
@Entity('hderma-ketqua', {database:environment.DB_USERS.database, orderBy: { CreateAt: 'DESC' }})
export class KetquaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    idKH: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    idCombo: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    SDT: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('{}')"})
    Khachhang: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('{}')"})
    Ketqua: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('{}')"})
    Mota: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('[]')"})
    Thongtin: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('[]')"})
    Phanloaida: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('[]')"})
    Tinhtrangda: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('[]')"})
    Sanpham: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('[]')"})
    Combo: string;
    @Column({ default: 1 })
    Step: number;
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
