import React, { useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { getAllPredictions, getLastPredictions, initPredictionTable } from '../src/services/PredictionDB';

type Prediction = {
  id?: number;
  fight: string;
  pick: string;
  method: string;
  result: string;
  created_at?: string;
};

export default function MyPredictionsScreen() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [accuracy, setAccuracy] = useState<number>(0);

  // Table initialization now happens once in App.js

  useFocusEffect(
    React.useCallback(() => {
      getLastPredictions(5)
        .then((data: Prediction[]) => {
          console.log('Last 5 predictions:', data);
          setPredictions(data);
        })
        .catch(e => console.log('Error loading predictions:', e));
      getAllPredictions()
        .then((all: Prediction[]) => {
          if (!all.length) return setAccuracy(0);
          const correct = all.filter((p: Prediction) => p.result === 'Win').length;
          setAccuracy(Math.round((correct / all.length) * 100));
        })
        .catch(e => console.log('Error loading all predictions:', e));
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6', padding: 16 }}>
      <Title style={{ marginBottom: 16, fontSize: 28, fontWeight: 'bold', color: '#222' }}>
        My Predictions
      </Title>
      <Paragraph style={{ fontSize: 18, marginBottom: 16 }}>
        Accuracy: {accuracy}%
      </Paragraph>
      {predictions.length === 0 ? (
        <Paragraph style={{ fontSize: 16, color: '#888', textAlign: 'center' }}>
          No predictions found. Make a prediction to see it here.
        </Paragraph>
      ) : (
        predictions.map((pred, idx) => (
          <Card key={pred.id || idx} style={{ marginBottom: 16, elevation: 2 }}>
            <Card.Content>
              <Title style={{ fontSize: 20, marginBottom: 4 }}>
                {pred.fight}
              </Title>
              <Paragraph style={{ fontSize: 16, color: '#555' }}>
                Your pick: {pred.pick} by {pred.method}
              </Paragraph>
              <Paragraph style={{ fontSize: 16, color: '#555' }}>
                Result: {pred.result || 'Pending'}
              </Paragraph>
            </Card.Content>
          </Card>
        ))
      )}
    </View>
  );
}
