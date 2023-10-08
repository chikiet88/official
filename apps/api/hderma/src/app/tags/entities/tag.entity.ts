import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToMany,
    ManyToOne,
    JoinColumn,
    JoinTable,
} from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';
import { BaivietEntity } from '../../baiviet/entities/baiviet.entity';
import { environment } from '@taza-base/environments';
@Entity('hderma-tags', {
  database:environment.DB_USERS.database,
    orderBy: {
        Ngaytao: 'ASC',
    },
})
export class TagEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ default: 0 })
    Loaitag: number;
    @Column({collation: 'utf8_general_ci',type: 'simple-json',default: () => "('{}')",})
    Type: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Tieude: string;
    @Column({ type: 'longtext', collation: 'utf8_general_ci' })
    Mota: string;
    @Column({collation: 'utf8_general_ci',type: 'simple-json',default: () => "('{}')",})
    Hinhanh: string;
    @Column({ type: 'longtext', collation: 'utf8_general_ci', default: "" })
    Image: string;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Trangthai: number;

    @ManyToMany(() => ProductEntity, (product) => product.Tags)
    @JoinTable()
    Products: ProductEntity[];

    @ManyToMany(() => BaivietEntity, (baiviet) => baiviet.Tags)
    @JoinTable()
    Baiviets: BaivietEntity[];

    @CreateDateColumn()
    Ngaytao: Date;
    @Column({ nullable: true })
    idTao: string;
}
