import { Module } from '@nestjs/common';
import { TreinoService } from './treino.service';
import { TreinoController } from './treino.controller';
import { PrismaService } from 'src/database/prismaservice';

@Module({
  controllers: [TreinoController],
  providers: [TreinoService,PrismaService],
})
export class TreinoModule {}
