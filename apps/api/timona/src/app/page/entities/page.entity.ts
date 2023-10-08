import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn} from 'typeorm';
import { environment } from '@taza-base/environments';
@Entity('page', {database:environment.DB_TIMONA.database, orderBy: { Ngaytao: 'DESC' } })
export class PageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Tieude: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default: '' })
    Slug: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default:'' })
    DesSeo: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default:'keywords' })
    KeywordSeo: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default:'index, follow' })
    RobotsSeo: string;
    @Column({collation: 'utf8_general_ci',type: 'simple-json',default: () => "('{}')"})
    Schema: string;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
