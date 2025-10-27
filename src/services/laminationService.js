import client from '@/lib/libsqlClient';

export async function getLaminations() {
    try{
        const res = await client.execute('SELECT id, name, price FROM Laminations ORDER BY id;');
        return res.rows;
    }
    catch (error){
        throw new Error(`Failed to fetch lamination sheets: ${error.message}`)
    }
}

export async function createLamination(){
    try{
        const res = await client.execute(
            'INSERT INTO Laminations (name, price) VALUES (?, ?) RETURNING id, name, price;',
            { args: ['', 0] }
        );
        return res.rows[0];
    }
    catch(error){
        throw new Error(`Failed to create lamination sheet: ${error}`)
    }
}

export async function updateLamination(id,name,price){
    try{
        const res = await client.execute(
            'UPDATE Laminations SET name = ?, price = ? WHERE id = ? RETURNING id, name, price;',
            { args: [name, Number(price), id] }
        );
        return res.rows[0];
    }
    catch(error){
        throw new Error(`Failed to update lamination sheet: ${error}`)
    }
}

export async function deleteLamination(id){
    try{
        const res = await client.execute('DELETE FROM Laminations WHERE id = ? RETURNING id;', { args: [id] });
        return res.rows[0];
    }
    catch(error){
        throw new Error(`Failed to delete lamination sheet: ${error}`)
    }
}