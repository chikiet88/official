import { environment } from 'apps/site/hderma/src/environments/environments';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
@Entity('hderma-customer', {
  database:environment.DB_HDERMA.database,
    orderBy: {
        Ngaytao: "DESC",
    }
})
export class CustomerEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    idUser: string;
    @Column({default:0})
    TongDiemcap: number;
    @Column({default:0})
    TongDiemqua: number;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    REF: string;
    @Column({ type: "text", collation: "utf8_general_ci" })
    Ghichu: string;
    @Column({ default: 1 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
