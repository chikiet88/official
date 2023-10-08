import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Index, CreateDateColumn, Generated, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';
import { environment } from 'apps/site/hderma/src/environments/environments';
@Entity('Tickets', {database:environment.DB_TIMONA.database, orderBy: { Ngaytao: 'DESC' } })
export class TicketEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    idKH: string;
    @Column({ collation: "utf8_general_ci" })
    Hoten: string;
    @Column({ collation: "utf8_general_ci" })
    SDT: string;
    @Column({ collation: "utf8_general_ci" })
    Diachi: string;
    @Column({ collation: "utf8_general_ci" })
    Email: string;
    @Column({ collation: "utf8_general_ci" })
    Des: string;
    @Column({ collation: "utf8_general_ci" })
    MaGT: string;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Trangthai: number;
    @Column({ collation: "utf8_general_ci", default:'' })
    Nguoixuly: string;
    @Column({default:0})
    isUpload: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column()
    published: number;
    @Column()
    idTao: string;
}