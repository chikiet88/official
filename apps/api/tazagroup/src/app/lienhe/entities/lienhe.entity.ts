import { environment } from '@taza-base/environments';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';
@Entity('tazagroup_lienhe', {database:environment.DB_TAZAGROUP.database, orderBy: { CreateAt: 'DESC' } })
export class LienheEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Hoten: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Email: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    SDT: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Noidung: string;
    @Column({ default:0 })
    type: number;
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