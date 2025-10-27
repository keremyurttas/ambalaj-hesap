import client from '@/lib/libsqlClient';

export async function getPaperSheets() {
    try{
        const res = await client.execute('SELECT id, name, price FROM PaperSheets ORDER BY id;');
        return res.rows;
    }
    catch (error){
        throw new Error(`Failed to fetch paper sheets: ${error.message}`)
    }
}

export async function createPaperSheet(){
    try{
        const res = await client.execute(
            'INSERT INTO PaperSheets (name, price) VALUES (?, ?) RETURNING id, name, price;',
            { args: ['', 0] }
        );
        return res.rows[0];
    }
    catch(error){
        throw new Error(`Failed to create paper sheet: ${error}`)
    }
}

export async function updatePaperSheet(id,name,price){
    try{
        const res = await client.execute(
            'UPDATE PaperSheets SET name = ?, price = ? WHERE id = ? RETURNING id, name, price;',
            { args: [name, Number(price), id] }
        );
        return res.rows[0];
    }
    catch(error){
        throw new Error(`Failed to update paper sheet: ${error}`)
    }
}

export async function deletePaperSheet(id){
    try{
        const res = await client.execute('DELETE FROM PaperSheets WHERE id = ? RETURNING id;', { args: [id] });
        return res.rows[0];
    }
    catch(error){
        throw new Error(`Failed to delete paper sheet: ${error}`)
    }
}