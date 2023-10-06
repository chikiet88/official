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

@Entity('baiviet', {database:environment.DB_TIMONA.database, orderBy: { CreateAt: 'DESC' } })
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
    Image_local: string;
    @Column({ default: '' })
    Imagenoibat: string;
    @Column({ default: '' })
    Imagenoibat_local: string;
    @Column({ default: '' })
    ImageMobile: string;
    @Column({ default: '' })
    ImageMobile_local: string;
    @Column({ default: '' })
    Khuvuc: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default: '' })
    Slug: string;
    @Column({
        collation: 'utf8_general_ci',
        type: 'simple-json',
        default: () => "('[]')",
    })
    Baiviet: string;
    @Column({
        collation: 'utf8_general_ci',
        type: 'simple-json',
        default: () => "('{}')",
    })
    ListImage: string;
    @Column({
        collation: 'utf8_general_ci',
        type: 'simple-json',
        default: () => "('{}')",
    })
    ListImage_local: string;
    @Column({ default: 1 })
    Theme: number;
    @Column({ default: '' })
    pid: string;
    @Column({ default: 0 })
    Loaibaiviet: number;
    @Column({ type: 'text', collation: 'utf8_general_ci', default:'' })
    TitleSeo: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default:'' })
    DesSeo: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default:'keywords' })
    KeywordSeo: string;
    @Column({ type: 'text', collation: 'utf8_general_ci', default:'index, follow' })
    RobotsSeo: string;
    @ManyToOne(() => DanhmucEntity, (danhmuc) => danhmuc.Baiviets)
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
