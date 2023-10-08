import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { BaivietEntity } from '../../baiviet/entities/baiviet.entity';
import { environment } from '@taza-base/environments';
import { MenutypeEntity } from '../../menutype/entities/menutype.entity';
@Entity('hderma-menu', {
  database:environment.DB_USERS.database, orderBy: { CreateAt: 'DESC' } })
export class MenuEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Title: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Slug: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Desc: string;
    @ManyToOne(() => MenutypeEntity, (menutype) => menutype.Menu,{nullable: true})
    @JoinColumn({ name: 'id' })
    Menutype: MenutypeEntity
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
