import * as SQLite from 'expo-sqlite';
let db;

export async function getDb() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('predictions_v2.db');
    // Ensure table is created immediately when db is initialized
    try {
      await db.execAsync(
        'CREATE TABLE IF NOT EXISTS predictions (id INTEGER PRIMARY KEY AUTOINCREMENT, fight TEXT, pick TEXT, method TEXT, result TEXT, created_at TEXT);'
      );
      console.log('Table predictions created or already exists');
    } catch (error) {
      console.log('Error creating table:', error);
    }
  }
  return db;
}
