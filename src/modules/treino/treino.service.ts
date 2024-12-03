import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaservice';
import { TreinoDTO } from './treino.dto';

@Injectable()
export class TreinoService {
    constructor(private prisma: PrismaService){}

    async create(data: TreinoDTO){
        try {
            const treino = await this.prisma.treino.create({
                data,
            });
            return treino;
        } catch (error) {
            return{
                status : "erro",
                message : error.message
            }
        }
    }

    async procuraGeral(){
        return this.prisma.treino.findMany();
    }

    async procurar(id_treino : number){
        return this.prisma.treino.findUnique({
            where:{
                id_treino : Number(id_treino)
            }
        });
    }

    async modificar(id_treino:number,data: TreinoDTO){
        const treinoExiste = await this.prisma.treino.findFirst({
            where:{
                id_treino : Number(id_treino),
            },
        });
        if(!treinoExiste){
            throw new Error('Treino não encontrado');
        } 
        const treino = await this.prisma.treino.update({
            data,
            where:{
                id_treino : Number(id_treino),
            },
        });
        return {
            status   : "Sucesso",
            anterior : treinoExiste,
            novo     : data
        };  
    }

    async deletar(id_treino:number){

        const treinoExiste = await this.prisma.treino.findFirst({
            where:{
                id_treino : Number(id_treino),
            },
        });
        if(!treinoExiste){
            throw new Error('Treino não encontrado');
        }
        await this.prisma.treino.delete({
            where:{
                id_treino : Number(id_treino),
            },
        });
        return {
            status : "Apagado com Sucesso",
            message :  treinoExiste
        };   
    }
}
