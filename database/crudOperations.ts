import { getDatabaseConnection, notaType } from './database';

const db = getDatabaseConnection();

// Crear una nueva nota
export const createNote = async (titulo: string, id_tipo_nota: number): Promise<number> => {
    try {
        return await db.then(async (tx) => {
            return await tx.runAsync(
                `INSERT INTO nota (titulo, id_tipo_nota)
                VALUES (?, ?);`,
                [titulo, id_tipo_nota]
            ).then((e) => e.lastInsertRowId);
        });
    } catch (error) {
        console.log("Error ---> ", error);
        return 0; // Añade un valor de retorno en caso de error
    }
};

// Obtener todas las notas
export const getAllNotes = async (): Promise<notaType[]> => {
    return await db.then(async (tx) => {
        return await tx.getAllAsync(
            `SELECT n.id, n.titulo, n.id_tipo_nota, t.nombre AS tipo
            FROM nota n
            JOIN tipo_nota t ON n.id_tipo_nota = t.id;`
        );
    })
};

// Eliminar una nota
export const deleteNote = (id: number) => {
    db.then((tx) => {
        tx.runAsync(
            `DELETE FROM nota WHERE id = ?;`,
            [id]
        );
    })
};
