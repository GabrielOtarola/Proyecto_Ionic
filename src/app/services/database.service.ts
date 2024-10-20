import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: SQLiteDBConnection | undefined;

  constructor(private storage: Storage) {
    this.initWebStorage();
  }

  async initWebStorage() {
    await this.storage.create(); // Inicializa el almacenamiento web
  }

  async initDB() {
    try {
      if (Capacitor.getPlatform() === 'web') {
        console.warn('SQLite no es compatible con la web. Usando almacenamiento web.');
        return;
      }

      const connection = await CapacitorSQLite.createConnection({
        database: 'mydb',
        version: 1,
        encrypted: false,
        mode: 'no-encryption'
      }).catch(error => {
        console.error('Error al crear la conexión de la base de datos:', error);
        return undefined;
      });

      if (connection && typeof connection === 'object') {
        this.db = connection as unknown as SQLiteDBConnection;
        await this.db.open(); // Abrir la conexión
        await this.createTables();
      } else {
        console.error('No se pudo establecer la conexión a la base de datos.');
      }
    } catch (error) {
      console.error('Error inicializando la base de datos:', error);
    }
  }

  async createTables() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT,
        age INTEGER,
        height INTEGER,
        weight INTEGER,
        gender TEXT,
        activityLevel TEXT
      );
    `;
    if (this.db) {
      try {
        await this.db.execute(createTableQuery);
        console.log('Tabla de usuarios creada en SQLite.');
      } catch (error) {
        console.error('Error al crear la tabla de usuarios:', error);
      }
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
    }
  }

  async registerUser(userData: any): Promise<boolean> {
    const { username, password, email, age, height, weight, gender, activityLevel } = userData;

    if (Capacitor.getPlatform() === 'web') {
      await this.storage.set(username, userData);
      console.log('Usuario registrado en almacenamiento web:', userData);
      return true;
    } else if (this.db) {
      try {
        const insertQuery = `
          INSERT INTO users (username, password, email, age, height, weight, gender, activityLevel)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;
        await this.db.run(insertQuery, [username, password, email, age, height, weight, gender, activityLevel]);
        console.log('Usuario registrado en SQLite:', userData);
        return true;
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return false;
      }
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
      return false;
    }
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    if (Capacitor.getPlatform() === 'web') {
      const keys = await this.storage.keys();
      for (const key of keys) {
        const user = await this.storage.get(key);
        if (user && user.email && user.email.toLowerCase() === email.toLowerCase()) {
          return true;
        }
      }
      return false;
    } else if (this.db) {
      const query = `SELECT * FROM users WHERE email = ?`;
      const result = await this.db.query(query, [email]);
      return result.values ? result.values.length > 0 : false;
    } else {
      console.error('La conexión a la base de datos no está inicializada.');
      return false;
    }
  }

  async getUser(username: string, password: string) {
    if (Capacitor.getPlatform() === 'web') {
      const keys = await this.storage.keys();
      for (const key of keys) {
        const user = await this.storage.get(key);
        if (user && user.username === username && user.password === password) {
          return user;
        }
      }
      return null;
    } else if (this.db) {
      const selectQuery = `SELECT * FROM users WHERE username = ? AND password = ?;`;
      const result = await this.db.query(selectQuery, [username, password]);
      if (result && result.values && result.values.length > 0) {
        return result.values[0];
      } else {
        return null;
      }
    }
  }
}

