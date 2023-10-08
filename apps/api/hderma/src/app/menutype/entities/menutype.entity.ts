import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { environment } from '@taza-base/environments';
import { MenuEntity } from '../../menu/entities/menu.entity';
@Entity('hderma-menutype', {
  database:environment.DB_USERS.database, orderBy: { CreateAt: 'DESC' } })
export class MenutypeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Title: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota: string;
    @Column({ default: '' })
    Slug: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
    Hinhanh: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
    Meta: string;
    @Column({ default: '' })
    Type: string;
    @OneToMany(() => MenuEntity, (menu) => menu.Menutype, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    Menu: MenuEntity[];
    @Column({ default: 0 })
    State: number;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Status: number;
    @CreateDateColumn()
    CreateAt: Date;
    @Column({ nullable: true })
    idCreate: string;
}
