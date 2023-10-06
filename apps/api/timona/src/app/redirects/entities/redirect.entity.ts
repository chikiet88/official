import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { environment } from '@taza-base/environments';
@Entity('redirect', {database:environment.DB_TIMONA.database, orderBy: { Ngaytao: 'DESC' } })
export class RedirectsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Tieude: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default: '' })
    Oldlink: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default: '' })
    Newlink: string;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @UpdateDateColumn()
    Ngaysua: Date;
    @Column({ nullable: true })
    idTao: string;
}