import { environment } from '@taza-base/environments';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm';
@Entity('hderma_upload', {database:environment.DB_USERS.database, orderBy: { Ngaytao: 'DESC' } })
export class UploadEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: "text", collation: "utf8_general_ci" ,nullable: true })
    spath: string;
    @Column({ type: "text", collation: "utf8_general_ci" ,nullable: true })
    url: string;
    @Column({ type: "text", collation: "utf8_general_ci" ,nullable: true })
    Lienket: string;
    @Column({ type: "text", collation: "utf8_general_ci" ,nullable: true })
    pathmobile: string;
    @Column({ type: "text", collation: "utf8_general_ci" ,nullable: true })
    name: string;
    @Column({ type: "text", collation: "utf8_general_ci" ,nullable: true })
    idDrive: string;
    @Column({ type: "text", collation: "utf8_general_ci" ,nullable: true })
    alt: string;
    @Column({ type: "text", collation: "utf8_general_ci" ,nullable: true })
    Mime: string;
    @Column({ default: 0 })
    type: number;
    @Column({ default: 1 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
