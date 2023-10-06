import { environment } from 'apps/site/hderma/src/environments/environments';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Index, CreateDateColumn, Generated, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';
@Entity('hderma-cauhinh', {database:environment.DB_HDERMA.database,
    orderBy: { Ngaytao: "DESC" }
})
export class CauhinhEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @Column({ collation: "utf8_general_ci" })
    Tieude: string;
    @Column({ collation: "utf8_general_ci" })
    Slug: string;
    @Column({ type: "longtext", collation: "utf8_general_ci" })
    Mota: string;
    @Column({ collation: "utf8_general_ci", type: "simple-json", default: () => "('{}')" })
    Content: string;
    @Column({ collation: "utf8_general_ci" })
    Branch: string;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
