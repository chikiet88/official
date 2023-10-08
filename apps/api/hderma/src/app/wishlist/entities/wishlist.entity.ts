import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';
import { environment } from '@taza-base/environments';
@Entity('hderma-wishlist', {
   database:environment.DB_USERS.database,
    orderBy: {
        Ngaytao: "DESC",
    }
})
export class WishlistEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    idKH: string;
    // @OneToOne(() => UsersEntity, (user) => user.Wishlist)
    // @JoinColumn({ name: 'idKH' })
    // User: UsersEntity
    @ManyToMany(() => ProductEntity, (product) => product.Wishlists)
    @JoinTable()
    Products: ProductEntity[];
    @Column({ type: "text", collation: "utf8_general_ci" })
    Ghichu: string;
    @Column({ default: 1 })
    Trangthai: number;
    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
