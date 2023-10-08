import { environment } from '@taza-base/environments';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Generated, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';
@Entity('hderma_customer_chiendich', {database:environment.DB_USERS.database,
    orderBy: { Ngaytao: "DESC" }
})
export class CustomerChiendichEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci'})
    idUser: string;
    @Column({ type: 'text', collation: 'utf8_general_ci'})
    idCD: string;
    @Column({ type: 'text', collation: 'utf8_general_ci'})
    idDH: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Noidung: string;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column()
    published: number;
    @Column()
    idTao: string;
}
