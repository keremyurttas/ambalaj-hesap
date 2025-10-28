import client from '@/lib/libsqlClient';

export async function getPaperSheets() {
    try{
        const res = await client.execute('SELECT id, name, price FROM PaperSheets ORDER BY id;');
        console.log(res);
        return res.rows;
    }
    catch (error){
        throw new Error(`Failed to fetch paper sheets: ${error.message}`)
    }
}

export async function createPaperSheet(name = '', price = 0) {
        const args = [name, Number(price)];
        console.log('createPaperSheet -> args length:', args.length, 'args:', args);
        if (typeof name !== 'string') {
            throw new Error('Invalid name: expected string');
        }
        if (!Number.isFinite(args[1])) {
            throw new Error('Invalid price: expected a numeric value');
        }

        // Insert with explicit columns. name and price are required in the schema.
        try {
            const res = await client.execute(
                'INSERT INTO PaperSheets (name, price) VALUES (?, ?) RETURNING id, name, price;',
                 args 
            );
            console.log('createPaperSheet -> sql executed, rows:', res.rows && res.rows.length);
            return res.rows[0];
        }  catch (error) {
        console.error('createPaperSheet error', error);
        throw new Error(`Failed to create paper sheet: ${error}`);
    }
}

export async function updatePaperSheet(id,name,price){
    try{
        const res = await client.execute(
            'UPDATE PaperSheets SET name = ?, price = ? WHERE id = ? RETURNING id, name, price;',
            [name, Number(price), id]
        );
        return res.rows[0];
    }
    catch(error){
        throw new Error(`Failed to update paper sheet: ${error}`)
    }
}

export async function deletePaperSheet(id){
    try{
        console.log('deletePaperSheet called with id=', id);
        const sql = 'DELETE FROM PaperSheets WHERE id = ? RETURNING id;';
        const args = [id];
        console.log('deletePaperSheet -> executing', { sql, args });
        const res = await client.execute(sql,args);
        return res.rows[0];
    }
    catch(error){
        console.error('deletePaperSheet error', error);
        throw new Error(`Failed to delete paper sheet: ${error}`)
    }
}