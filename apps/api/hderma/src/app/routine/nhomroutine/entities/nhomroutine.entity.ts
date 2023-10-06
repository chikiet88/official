import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    Index,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    OneToMany,
} from 'typeorm';
import { environment } from '@taza-base/environments';
@Entity('hderma-nhomroutine', {database:environment.DB_HDERMA.database, orderBy: { CreateAt: 'DESC' }})
export class NhomroutineEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Title: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota: string;
    @Column({ collation: 'utf8_general_ci', type: 'simple-json', default: () => "('[]')"})
    Dieukien: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Type: number;
    @Column({ default: 0 })
    Tinhtrang: number;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Trangthai: number;
    @CreateDateColumn()
    CreateAt: Date;
    @Column({ nullable: true })
    idTao: string;
}
