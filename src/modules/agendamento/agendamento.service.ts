import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaservice';
import { agendamentoDTO } from './agendamento.dto';

@Injectable()
export class AgendamentoService {
    constructor(private prisma: PrismaService){}

    async create(data: agendamentoDTO){
        try {
            const agendamento = await this.prisma.agendamento.create({
                data,
            });
            return agendamento;
        } catch (error) {
            return{
                status : "erro",
                message : error.message
            }
        }
    }

    async procuraGeral(){
        return this.prisma.agendamento.findMany({
            include:{
                treino:true,
                status:{
                    select:{
                        descricao:true
                    }
                }
            }
        });
    }

    async procurar(id_agendamento : number){
        return this.prisma.agendamento.findFirst({
            where:{
                id_agendamento : Number(id_agendamento)
            },
            include:{
                treino:true,
                
                status:{
                    select:{
                        descricao:true
                    }
                }
            }
        });
    }

    async modificar(id_agendamento:number,data: agendamentoDTO){
        const agendamentoExiste = await this.prisma.agendamento.findFirst({
            where:{
                id_agendamento : Number(id_agendamento),
            },
        });
        if(!agendamentoExiste){
            throw new Error('agendamento não encontrado');
        } 
        const agendamento = await this.prisma.agendamento.update({
            data,
            where:{
                id_agendamento : Number(id_agendamento),
            },
        });
        return {
            status   : "Sucesso",
            anterior : agendamentoExiste,
            novo     : data
        };  
    }

    async deletar(id_agendamento:number){
        const agendamentoExiste = await this.prisma.agendamento.findFirst({
            where:{
                id_agendamento : Number(id_agendamento),
            },
        });
        if(!agendamentoExiste){
            throw new Error('agendamento não encontrado');
        }
        await this.prisma.agendamento.delete({
            where:{
                id_agendamento : Number(id_agendamento),
            },
        });
        return {
            deleta : agendamentoExiste
        };   
    }

    async atualizar(id_agendamento:number,data : agendamentoDTO){
        const agendamentoExiste = await this.procurar(id_agendamento);

        if (!agendamentoExiste){
            return {
                status : "Erro",
                message: "Agendamento não encontrado"
            }
        }
        try {
            await this.prisma.agendamento.update({
                data,
                where:{
                    id_agendamento : Number(id_agendamento),
                }
            })
            return {
                status : "Sucesso",
                anterior : agendamentoExiste,
                novo : data
            }   
        } catch (error) {
            return {
                status : "Erro",
                message: error.message
            }     
        }
          
    }
}
