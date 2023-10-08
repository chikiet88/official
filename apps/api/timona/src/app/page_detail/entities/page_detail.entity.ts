import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn} from 'typeorm';
import { environment } from '@taza-base/environments';
@Entity('page_detail', {database:environment.DB_TIMONA.database, orderBy: { Ngaytao: 'DESC' } })
export class PageDetailEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    idPage: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Title: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota: string;
    @Column({ type: 'longtext', collation: 'utf8_general_ci' })
    Noidung: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default: '' })
    Slug: string;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
