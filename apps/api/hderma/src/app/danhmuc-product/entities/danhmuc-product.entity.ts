import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';
import { environment } from 'apps/site/hderma/src/environments/environments';
@Entity('hderma-danhmuc-product',{
  database:environment.DB_HDERMA.database,
  orderBy: {
    CreateAt: "ASC",
  }
  })
export class DanhmucProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({default:''})
    pid: string;
    @Column({type:"text",collation: "utf8_general_ci"})
    Code: string;
    @Column({type:"text",collation: "utf8_general_ci"})
    Title: string;
    @Column({type:"longtext",collation: "utf8_general_ci"})
    Mota: string;
    @Column({collation: 'utf8_general_ci',type: 'simple-json',default: () => "('{}')",})
    Hinhanh: string;
    @Column({type:"longtext",collation: "utf8_general_ci"})
    Slug: string;
    @Column({type:"longtext",collation: "utf8_general_ci"})
    Icon: string;
    @Column({type:"longtext",collation: "utf8_general_ci"})
    Image: string;
    @Column({type:"longtext",collation: "utf8_general_ci"})
    ImageSanpham: string;
    @Column()
    Loaidanhmuc: string;
    @OneToMany(() => ProductEntity, (product) => product.Danhmuc, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    Products: ProductEntity[];
    @Column({default:1})
    Ordering: number;
    @Column({default:0})
    Module:number;
    @Column({nullable:true})
    Type:string;
    @Column({default:0})
    Trangthai:number;
    @CreateDateColumn()
    CreateAt:Date;
    @Column({nullable: true})
    idTao:string;
 }
