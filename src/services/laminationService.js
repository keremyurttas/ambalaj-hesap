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

export async function createLamination(name, price) {
    try {
        console.log('createLamination called with', { name, price });
        const res = await client.execute(
            'INSERT INTO Laminations (name, price) VALUES (?, ?) RETURNING id, name, price;',
            [name, price] 
        );
        console.log('createLamination -> sql executed, rows:', res.rows && res.rows.length);
        return res.rows[0];
    } catch (error) {
        console.error('createLamination error', error);
        throw new Error(`Failed to create lamination sheet: ${error}`)
    }
}

export async function updateLamination(id,name,price){
    try{
        const res = await client.execute(
            'UPDATE Laminations SET name = ?, price = ? WHERE id = ? RETURNING id, name, price;',
            [name, Number(price), id] 
        );
        return res.rows[0];
    }
    catch(error){
        throw new Error(`Failed to update lamination sheet: ${error}`)
    }
}

export async function deleteLamination(id){
    try{
        console.log('deleteLamination called with id=', id);
        const sql = 'DELETE FROM Laminations WHERE id = ? RETURNING id;';
        const args = [id];
        console.log('deleteLamination -> executing', { sql, args });
        const res = await client.execute(sql, args );
        return res.rows[0];
    }
    catch(error){
        console.error('deleteLamination error', error);
        throw new Error(`Failed to delete lamination sheet: ${error}`)
    }
}