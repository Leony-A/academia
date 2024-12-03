import { Controller,Post,Put,Patch,Delete,Body,Get, Param} from '@nestjs/common';
import { TreinoService } from './treino.service';
import { TreinoDTO } from './treino.dto';

@Controller('treino')
export class TreinoController {
  constructor(private readonly treinoService: TreinoService) {}
  
  @Post('novo')
    async novo(@Body() data: TreinoDTO){
      return this.treinoService.create(data)
    }
  @Get()
    async buscar(){
      return this.treinoService.procuraGeral();
    }
  
  @Get(':id_treino')
    async pesquisar(@Param('id_treino') id_treino: number){
      return this.treinoService.procurar(id_treino);
    }

  @Put(':id_treino')
    async altera(@Param('id_treino') id_treino: number, @Body() data:TreinoDTO){
      return this.treinoService.modificar(id_treino,data);
    }

  @Delete('delete/:id_treino')
    async delete(@Param('id_treino') id_treino:number){
      return this.treinoService.deletar(id_treino);
    }
}
