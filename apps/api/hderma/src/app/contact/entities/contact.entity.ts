import { environment } from '@taza-base/environments';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('hderma-contact', {database:environment.DB_USERS.database, orderBy: { CreateAt: 'DESC' } })
export class ContactEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Hoten: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Email: string;
    @Column()
    SDT: string;
    @Column({ default: 0 })
    Vande: number;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Mota: string;
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
