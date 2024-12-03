import { Controller,Post,Put,Get,Delete,Body,Param } from '@nestjs/common';
import { StatusService } from './status.service';
import { statusDTO } from './status.dto';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}
  @Post('novo')
    async novo(@Body() data: statusDTO){
      return this.statusService.create(data)
    }
  @Get()
    async buscar(){
      return this.statusService.procuraGeral();
    }
  
  @Get(':id_treino')
    async pesquisar(@Param('id_treino') id_treino: number){
      return this.statusService.procurar(id_treino);
    }

  @Put(':id_treino')
    async altera(@Param('id_treino') id_treino: number, @Body() data:statusDTO){
      return this.statusService.modificar(id_treino,data);
    }

  @Delete('deletar/:id_treino')
    async delete(@Param('id_treino') id_treino:number){
      return this.statusService.deletar(id_treino);
    }
}
