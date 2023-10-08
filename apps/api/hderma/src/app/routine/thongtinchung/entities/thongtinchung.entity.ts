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
@Entity('hderma-thongtinchung', {database:environment.DB_USERS.database, orderBy: { CreateAt: 'DESC' }})
export class ThongtinchungEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Title: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default: '' })
    Cauhoi: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('[]')"})
    Dapan: string;
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
