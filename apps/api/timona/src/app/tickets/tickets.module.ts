import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],

  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
