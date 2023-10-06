import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { DonhangEntity } from '../../donhang/entities/donhang.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import { environment } from '@taza-base/environments';
@Entity('hderma-donhangchitiet', {database:environment.DB_HDERMA.database,
    orderBy: {
        Ngaytao: "DESC",
    }
})
export class DonhangchitietEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    idDH: string;
    @Column()
    idSP: string;
    @Column()
    Soluong: number;
    @Column()
    Dongia: number;
    @Column()
    Khuyenmai: number;
    @Column({ default: '' })
    idGioithieu: string;
    @ManyToOne(() => DonhangEntity, (donhang) => donhang.Donhangchitiets)
    @JoinColumn({ name: 'idDH' })
    Donhang: DonhangEntity;
    @ManyToOne(() => ProductEntity, (product) => product.Donhangchitiets)
    @JoinColumn({ name: 'idSP' })
    Product: ProductEntity;
    @Column({ type: "text", collation: "utf8_general_ci" })
    Ghichu: string;
    @Column({ default: 1 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
