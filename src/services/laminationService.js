import { prisma } from "@/lib/prisma";

export async function getLaminations() {
    try{
        const laminations = await prisma.laminations.findMany();
        return laminations;
    }
    catch (error){
        throw new Error(`Failed to fetch lamination sheets: ${error.message}`)
    }
}

export async function createLamination(){
    try{
        const lamination = await prisma.laminations.create(
            {data:{
                name:'',
                price:0
            }}
        )
        return lamination;
    }
    catch(error){
        throw new Error(`Failed to create lamination sheet: ${error}`)
    }
}

export async function updateLamination(id,name,price){
    try{
        const updatedLamination = await prisma.laminations.update({
            where:{id},
            data:{name,price:Number(price)}
        })
        return updatedLamination;
    }
    catch(error){
        throw new Error(`Failed to update lamination sheet: ${error}`)
    }
}

export async function deleteLamination(id){
    try{
        const deletedLamination = await prisma.laminations.delete({
            where:{id}
        })
        return deletedLamination;
    }
    catch(error){
        throw new Error(`Failed to delete lamination sheet: ${error}`)
    }
}