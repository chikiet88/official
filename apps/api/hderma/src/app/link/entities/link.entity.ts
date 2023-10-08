import { environment } from '@taza-base/environments';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';
@Entity('hderma-link', {database:environment.DB_USERS.database, orderBy: { CreateAt: 'DESC' } })
export class LinkEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({default:''})
    pid: string;
    @Column({default:''})
    idUser: string;
    @Column({default:''})
    idProduct: string;
    @Column({default:''})
    idDonhangchitiet: string;
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
