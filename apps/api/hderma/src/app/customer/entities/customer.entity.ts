import { environment } from '@taza-base/environments';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
@Entity('hderma-customer', {
  database:environment.DB_USERS.database,
    orderBy: {
        Ngaytao: "DESC",
    }
})
export class CustomerEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    idUser: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    Hoten: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    SDT: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    Gioitinh: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    email: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    Diachi: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    Ghichu: string;
    @Column({ default: 1 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
