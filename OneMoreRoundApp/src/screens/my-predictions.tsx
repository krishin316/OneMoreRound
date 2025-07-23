import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { getAllPredictions, getLastPredictions } from '../services/PredictionStorage';

export default function MyPredictionsScreen() {
  const [lastPredictions, setLastPredictions] = useState([]);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    async function fetchPredictions() {
      try {
        const last = await getLastPredictions(5);
        setLastPredictions(last);
        const all = await getAllPredictions();
        if (all.length > 0) {
          const correct = all.filter(p => p.result && p.pick === p.result).length;
          setAccuracy(Math.round((correct / all.length) * 100));
        } else {
          setAccuracy(0);
        }
      } catch (e) {
        console.log('Error loading predictions:', e);
      }
    }
    fetchPredictions();
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Title>My Predictions</Title>
      <Paragraph>Accuracy: {accuracy}%</Paragraph>
      {lastPredictions.length === 0 ? (
        <Text>No predictions yet.</Text>
      ) : (
        lastPredictions.map((p, idx) => (
          <Card key={idx} style={{ marginVertical: 8 }}>
            <Card.Content>
              <Title>{p.fight}</Title>
              <Paragraph>Pick: {p.pick}</Paragraph>
              <Paragraph>Method: {p.method}</Paragraph>
              <Paragraph>Result: {p.result || 'Pending'}</Paragraph>
              <Paragraph>Date: {new Date(p.created_at).toLocaleString()}</Paragraph>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
}