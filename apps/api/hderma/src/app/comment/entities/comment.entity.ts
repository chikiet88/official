import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';
import { environment } from '@taza-base/environments';
  @Entity('hderma-comment', {database:environment.DB_HDERMA.database, orderBy: { CreateAt: 'DESC' } })
  export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ collation: "utf8_general_ci", default: '' })
    Comment: string;
    @Column()
    idProduct: string;
    @Column()
    idUser: string;
    @Column({ default: 5 })
    Rate: number;
    @Column({ default: '' })
    pid: string;
    @Column({ default: false })
    Tinhtrang: boolean;
    // @ManyToOne(() => UsersEntity,(user) => user.Comments)
    // @JoinColumn({ name: 'idUser' })
    // User: UsersEntity;
    @ManyToOne(
      () => ProductEntity,
      (product) => product.Comments,
    )
    @JoinColumn({ name: 'idProduct' })
    Product: ProductEntity;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Trangthai: number;
    @CreateDateColumn()
    CreateAt: Date;
    @Column({ nullable: true })
    idTao: string;
  }
