import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('notesApp.db');

export type tipo_notaType = {
    id: number;
    nombre: string;
}

export type notaType = {
    id: number;
    titulo: string;
    id_tipo_nota: number;
    tipo?: string;
}


export const initializeDatabase = async () => {
    await db.then((tx) => {
        // tx.execAsync(
        //     `DROP TABLE nota;`
        // );
        tx.execAsync(
          `CREATE TABLE IF NOT EXISTS tipo_nota (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL
          );`
        );

        tx.execAsync(
            `CREATE TABLE IF NOT EXISTS nota (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              titulo TEXT NOT NULL,
              id_tipo_nota INTEGER NOT NULL,
              FOREIGN KEY (id_tipo_nota) REFERENCES tipo_nota(id)
            );`
        );

        tx.execAsync(
            `INSERT INTO tipo_nota (nombre)
             SELECT 'Personal'
             WHERE NOT EXISTS (SELECT 1 FROM tipo_nota WHERE nombre = 'Personal');`
        );
  
        tx.execAsync(
            `INSERT INTO tipo_nota (nombre)
             SELECT 'Trabajo'
             WHERE NOT EXISTS (SELECT 1 FROM tipo_nota WHERE nombre = 'Trabajo');`
        );
    });
    console.log("Tablas creadas correctamente")
  };

export const getDatabaseConnection = () => db;
