import { environment } from '@taza-base/environments';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Index, CreateDateColumn, Generated, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';
@Entity('hderma_cauhinh_hoahong', {database:environment.DB_USERS.database,
    orderBy: { Ngaytao: "DESC" }
})
export class CauhinhHoahongEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    doanhthutu: number;
    @Column()
    doanhthuden: number;
    @Column({ collation: "utf8_general_ci" })
    capbac: string;
    @Column()
    hhcanhan: number;
    @Column()
    hhgioithieu: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column()
    published: number;
    @Column()
    idTao: string;
}
