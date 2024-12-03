import { Module } from '@nestjs/common';
import { TreinoModule } from './modules/treino/treino.module';
import { AgendamentoModule } from './modules/agendamento/agendamento.module';
import { StatusModule } from './modules/status/status.module';

@Module({
  imports: [TreinoModule, AgendamentoModule, StatusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
