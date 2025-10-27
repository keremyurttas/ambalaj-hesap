import { prisma } from "@/lib/prisma";

export async function getPaperSheets() {
    try{
        const papers = await prisma.paperSheets.findMany();
        return papers;
    }
    catch (error){
        throw new Error(`Failed to fetch paper sheets: ${error.message}`)
    }
}

export async function createPaperSheet(){
    try{
        const paper = await prisma.paperSheets.create(
            {data:{
                name:'',
                price:0
            }}
        )
        return paper;
    }
    catch(error){
        throw new Error(`Failed to create paper sheet: ${error}`)
    }
}

export async function updatePaperSheet(id,name,price){
    try{
        const updatedPaper = await prisma.paperSheets.update({
            where:{id},
            data:{name,price:Number(price)}
        })
        return updatedPaper;
    }
    catch(error){
        throw new Error(`Failed to update paper sheet: ${error}`)
    }
}

export async function deletePaperSheet(id){
    try{
        const deletedPaper = await prisma.paperSheets.delete({
            where:{id}
        })
        return deletedPaper;
    }
    catch(error){
        throw new Error(`Failed to delete paper sheet: ${error}`)
    }
}