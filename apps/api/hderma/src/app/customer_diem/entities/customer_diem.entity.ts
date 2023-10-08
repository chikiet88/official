import { environment } from '@taza-base/environments';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
@Entity('hderma_customer_diem', {
  database:environment.DB_USERS.database,
    orderBy: {
        Ngaytao: "DESC",
    }
})
export class CustomerDiemEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    idUser: string;
    @Column()
    idDonHang: string;
    @Column()
    Diemcap: number;
    @Column()
    Diemqua: number;
    @Column({ type: "text", collation: "utf8_general_ci" })
    Ghichu: string;
    @Column({ default: 1 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
