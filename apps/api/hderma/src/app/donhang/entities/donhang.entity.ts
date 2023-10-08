import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DonhangchitietEntity } from '../../donhangchitiet/entities/donhangchitiet.entity';
import { environment } from '@taza-base/environments';
@Entity('hderma-donhang', {
  database:environment.DB_USERS.database,
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
    @Column({ type: "text", collation: "utf8_general_ci" })
    Payment: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    Shipping: string;
    @Column({ default: 0 })
    Status: number;
    @Column({ default: 0 })
    View: number;
    @Column({default: 0 })
    TotalAmount:number;
    @Column({ default: 1 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
