import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { DanhmucProductEntity } from '../../danhmuc-product/entities/danhmuc-product.entity';
import { DonhangchitietEntity } from '../../donhangchitiet/entities/donhangchitiet.entity';
import { TagEntity } from '../../tags/entities/tag.entity';
import { WishlistEntity } from '../../wishlist/entities/wishlist.entity';
import { environment } from '@taza-base/environments';
@Entity('hderma-product', {
  database:environment.DB_HDERMA.database,
  orderBy: {
    Ngaytao: 'DESC',
  },
})
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  idDM: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Code: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Tieude: string;
  @Column({ type: 'longtext', collation: 'utf8_general_ci' })
  Mota: string;
  @Column({ type: 'longtext', collation: 'utf8_general_ci' })
  Khoiluong: string;
  @Column({ type: 'longtext', collation: 'utf8_general_ci' })
  Slug: string;
  @Column({ type: 'longtext', collation: 'utf8_general_ci' })
  SKU: string;
  @Column()
  Gia: number;
  @Column()
  GiaSale: number;
  @Column({collation: 'utf8_general_ci',type: 'simple-json',default: () => "('{}')",})
  Hinhanh: string;
  @Column({ type: 'longtext', collation: 'utf8_general_ci' })
  Image: string;
  @Column({ type: 'longtext', collation: 'utf8_general_ci' })
  Image1: string;
  @Column({
    collation: 'utf8_general_ci',
    default: ""
  })
  ContentImage: string;
  @Column({
    collation: 'utf8_general_ci',
    type: 'simple-json',
    default: () => "('{}')",
  })
  ListImage: string;
  @Column({ type: 'longtext', collation: 'utf8_general_ci' })
  Type: string;
  
  @ManyToMany(() => TagEntity, (tag) => tag.Products)
  Tags: TagEntity[];

  @ManyToMany(() => WishlistEntity, (wishlist) => wishlist.Products)
  Wishlists: WishlistEntity[];
  @Column()
  Tinhtrang: number;
  @Column({ type: 'longtext', collation: 'utf8_general_ci', default: "" })
  Thannhphannoibat: string;
  @Column({ type: 'longtext', collation: 'utf8_general_ci', default: "" })
  Thannhphanchitiet: string;
  @Column({ type: 'longtext', collation: 'utf8_general_ci', default: "" })
  Huongdan: string;
  @Column({ type: 'longtext', collation: 'utf8_general_ci', default: "" })
  Loaidaphuhop: string;
  @Column({ collation: "utf8_general_ci", type: "simple-json", default: () => "('{}')" })
  Noidung: string;
  @Column({ collation: "utf8_general_ci", type: "simple-json", default: () => "('[]')" })
  Noibat: string;
  @Column({ default: "" })
  Imagecachsudung: string;
  @ManyToOne(() => DanhmucProductEntity, (danhmuc) => danhmuc.Products)
  @JoinColumn({ name: 'idDM' })
  Danhmuc: DanhmucProductEntity;
  @OneToMany(() => DonhangchitietEntity, (donhangchitiet) => donhangchitiet.Product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  Donhangchitiets: DonhangchitietEntity[];
  @OneToMany(() => CommentEntity, (comment) => comment.Product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  Comments: CommentEntity[];
  @Column({ type: 'text', collation: 'utf8_general_ci', default:'' })
  TitleSeo: string;
  @Column({ type: 'text', collation: 'utf8_general_ci', default:'' })
  DesSeo: string;
  @Column({ type: 'text', collation: 'utf8_general_ci', default:'keywords' })
  KeywordSeo: string;
  @Column({ type: 'text', collation: 'utf8_general_ci', default:'index, follow' })
  RobotsSeo: string;
  @Column({ default: 1 })
  Ordering: number;
  @Column({ default: 0 })
  Trangthai: number;
  @CreateDateColumn()
  Ngaytao: Date;
  @Column({ nullable: true })
  idTao: string;
}
