import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaservice';
import { statusDTO } from './status.dto';

@Injectable()
export class StatusService {
    constructor(private prisma: PrismaService){}

    async create(data: statusDTO){
        try {
            const status = await this.prisma.status.create({
                data,
            });
            return status;
        } catch (error) {
            return{
                status : "erro",
                message : error.message
            }
        }
    }

    async procuraGeral(){
        return this.prisma.status.findMany();
    }

    async procurar(id_status : number){
        return this.prisma.status.findUnique({
            where:{
                id_status : Number(id_status)
            }
        });
    }

    async modificar(id_status:number,data: statusDTO){
        const statusExiste = await this.prisma.status.findFirst({
            where:{
                id_status : Number(id_status),
            },
        });
        if(!statusExiste){
            throw new Error('Status não encontrado');
        } 
        const status = await this.prisma.status.update({
            data,
            where:{
                id_status : Number(id_status),
            },
        });
        return {
            status   : "Sucesso",
            anterior : statusExiste,
            novo     : data
        };  
    }

    async deletar(id_status:number){
        const statusExiste = await this.prisma.status.findFirst({
            where:{
                id_status : Number(id_status),
            },
        });
        if(!statusExiste){
            throw new Error('Status não encontrado');
        }
        await this.prisma.status.delete({
            where:{
                id_status : Number(id_status),
            },
        });
        return {
            status : "Apagado com Sucesso",
            message :  statusExiste
        };   
    }
}
