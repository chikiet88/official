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
import { environment } from '@taza-base/environments';
@Entity('tazagroup_baiviet', {database:environment.DB_TAZAGROUP.database, orderBy: { CreateAt: 'DESC' } })
export class BaivietEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Title: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota: string;
    @Column({ default: '' })
    Image: string;
    @Column({ default: '' })
    Imagenoibat: string;
    @Column({ default: '' })
    ImageMobile: string;
    @Column({ default: '' })
    Khuvuc: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default: '' })
    Slug: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default: '' })
    Baiviet: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('[]')"})
    Noidung: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('{}')"})
    ListImage: string;
    @Column({collation: 'utf8_general_ci',type: 'simple-json',default: () => "('{}')",})
    Hinhanh: string;
    @Column({ default: 1 })
    Theme: number;
    @Column({ default: '' })
    pid: string;
    @Column({ default: 0 })
    Loaibaiviet: number;
    @Column({ default: false })
    Noibat: boolean;
    @Column({ type: 'text', collation: 'utf8_general_ci', default:'' })
    TitleSeo: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default:'' })
    DesSeo: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default:'keywords' })
    KeywordSeo: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default:'index, follow' })
    RobotsSeo: string;
    @ManyToOne(() => DanhmucEntity, (danhmuc) => danhmuc.Baiviets,{nullable: true})
    @JoinColumn({ name: 'pid' })
    Danhmuc: DanhmucEntity
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
