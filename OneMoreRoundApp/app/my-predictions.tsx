import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { getAllPredictions, getLastPredictions, Prediction } from '../src/services/PredictionStorage';

export default function MyPredictionsScreen() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [accuracy, setAccuracy] = useState<number>(0);

  useFocusEffect(
    React.useCallback(() => {
      getLastPredictions(5)
        .then((data: Prediction[]) => {
          setPredictions(data);
        })
        .catch(e => console.log('Error loading predictions:', e));
      getAllPredictions()
        .then((all: Prediction[]) => {
          if (!all.length) return setAccuracy(0);
          const correct = all.filter((p: Prediction) => p.result && p.pick === p.result).length;
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
        predictions.map((p, idx) => (
          <Card key={idx} style={{ marginVertical: 8 }}>
            <Card.Content>
              <Title>{p.fight}</Title>
              <Paragraph>Pick: {p.pick}</Paragraph>
              <Paragraph>Method: {p.method}</Paragraph>
              <Paragraph>Result: {p.result || 'Pending'}</Paragraph>
              <Paragraph>Date: {p.created_at ? new Date(p.created_at).toLocaleString() : ''}</Paragraph>
            </Card.Content>
          </Card>
        ))
      )}
    </View>
  );
}
