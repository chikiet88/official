import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DonhangchitietEntity } from '../../donhangchitiet/entities/donhangchitiet.entity';
import { environment } from 'apps/site/hderma/src/environments/environments';
@Entity('hderma-donhang', {
  database:environment.DB_HDERMA.database,
    orderBy: {
        Ngaytao: "DESC",
    }
})
export class DonhangEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    idNhanvien: string;
    @Column()
    idKH: string;
    @Column()
    MaDonHang: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    Hoten: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    SDT: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    email: string;
    @OneToMany(() => DonhangchitietEntity, (donhangchitiet) => donhangchitiet.Donhang, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Donhangchitiets: DonhangchitietEntity[];
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
    Diachi: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    Ghichu: string;
    @Column({ default: 0 })
    Status: number;
    @Column({ default: 1 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
