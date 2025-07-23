// PredictionStorage.ts
// Prediction logic using AsyncStorage for persistence

import AsyncStorage from '@react-native-async-storage/async-storage';

export type Prediction = {
  fight: string;
  pick: string;
  method: string;
  result: string | null;
  created_at: string;
};

const PREDICTIONS_KEY = 'predictions';

export async function addPrediction(prediction: Omit<Prediction, 'created_at'>) {
  const newPrediction: Prediction = {
    ...prediction,
    created_at: new Date().toISOString(),
  };
  const existing = await getAllPredictions();
  await AsyncStorage.setItem(PREDICTIONS_KEY, JSON.stringify([newPrediction, ...existing]));
}

export async function getAllPredictions(): Promise<Prediction[]> {
  const data = await AsyncStorage.getItem(PREDICTIONS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function getLastPredictions(limit = 5): Promise<Prediction[]> {
  const all = await getAllPredictions();
  return all.slice(0, limit);
}

export async function clearPredictions() {
  await AsyncStorage.removeItem(PREDICTIONS_KEY);
}
