import { Controller,Body,Post,Get,Put,Delete,Param } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { agendamentoDTO } from './agendamento.dto';

@Controller('agendamento')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}
  
  @Post('novo')
    async novo(@Body() data: agendamentoDTO){
      return this.agendamentoService.create(data)
    }
  @Get()
    async buscar(){
      return this.agendamentoService.procuraGeral();
    }
  
  @Get(':id_treino')
    async pesquisar(@Param('id_treino') id_treino: number){
      return this.agendamentoService.procurar(id_treino);
    }

  @Put(':id_treino')
    async altera(@Param('id_treino') id_treino: number, @Body() data:agendamentoDTO){
      return this.agendamentoService.modificar(id_treino,data);
    }

  @Delete('deletar/:id_treino')
    async delete(@Param('id_treino') id_treino:number){
      return this.agendamentoService.deletar(id_treino);
    }
}
