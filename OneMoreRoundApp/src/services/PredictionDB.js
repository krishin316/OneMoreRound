import { getDb } from './dbInstance';

/**
 * @typedef {Object} Prediction
 * @property {number} [id]
 * @property {string} fight
 * @property {string} pick
 * @property {string} method
 * @property {string|null} result
 * @property {string} created_at
 */

/**
 * Add a prediction to the database
 * @param {{ fight: string, pick: string, method: string, result: string|null }} prediction
 * @returns {Promise<boolean>}
 */
export async function addPrediction({ fight, pick, method, result }) {
  try {
    const db = await getDb();
    console.log('Saving prediction:', { fight, pick, method, result });
    await db.execAsync(
      'INSERT INTO predictions (fight, pick, method, result, created_at) VALUES (?, ?, ?, ?, ?);',
      [fight, pick, method, result || '', new Date().toISOString()]
    );
    const resultSet = await db.execAsync('SELECT * FROM predictions ORDER BY created_at DESC LIMIT 5;');
    console.log('Predictions after insert:', resultSet && resultSet.rows ? resultSet.rows : []);
    console.log('Prediction saved successfully');
    return true;
  } catch (error) {
    console.log('Error saving prediction:', error);
    throw error;
  }
}

/**
 * Get the last N predictions
 * @param {number} [limit=5]
 * @returns {Promise<Prediction[]>}
 */
export async function getLastPredictions(limit = 5) {
  try {
    const db = await getDb();
    const result = await db.execAsync(
      `SELECT * FROM predictions ORDER BY created_at DESC LIMIT ${limit};`
    );
    return result && result.rows ? result.rows : [];
  } catch (error) {
    throw error;
  }
}

/**
 * Get all predictions
 * @returns {Promise<Prediction[]>}
 */
export async function getAllPredictions() {
  try {
    const db = await getDb();
    const result = await db.execAsync(
      'SELECT * FROM predictions;'
    );
    return result && result.rows ? result.rows : [];
  } catch (error) {
    throw error;
  }
}
// Table creation is handled in dbInstance.js
