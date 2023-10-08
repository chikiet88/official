import { environment } from '@taza-base/environments';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Index, CreateDateColumn, Generated, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';
@Entity('hderma_cauhinh_chiendich', {database:environment.DB_USERS.database,
    orderBy: { Ngaytao: "DESC" }
})
export class CauhinhChiendichEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({collation: 'utf8_general_ci',type: 'simple-json', default: () => "('[]')"})
    ListDiem: string;
    @Column({collation: 'utf8_general_ci',type: 'simple-json', default: () => "('[]')"})
    ListGiatriqua: string;
    @Column({collation: 'utf8_general_ci',type: 'simple-json', default: () => "('[]')"})
    ListMax: string;
    @Column({collation: 'utf8_general_ci',type: 'simple-json', default: () => "('[]')"})
    ListActive: string;
    // @Column({collation: 'utf8_general_ci',type: 'simple-json', default: () => "('[]')"})
    // Nhiemvus: string;
    @Column({ type: 'text', collation: 'utf8_general_ci'})
    TenCD: string;
    @Column({collation: 'utf8_general_ci',type: 'simple-json', default: () => "('{}')"})
    Sanpham: string;
    @Column()
    Soluong: number;
    @Column({collation: 'utf8_general_ci',type: 'simple-json', default: () => "('{}')"})
    Deadline: string;
    @Column({collation: 'utf8_general_ci',type: 'simple-json', default: () => "('{}')"})
    Loai: string;
    @Column()
    DoanhThu: number;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Noidung: string;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column()
    published: number;
    @Column()
    idTao: string;
}
