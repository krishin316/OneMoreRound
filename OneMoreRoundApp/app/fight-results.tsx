import React from 'react';
import { FlatList, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import DataService from '../src/services/DataService';

export default function FightResultsScreen() {
  const results = DataService.getFightResults(); // You should add mock results to DataService
  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6', padding: 16 }}>
      <Title style={{ marginBottom: 16, fontSize: 28, fontWeight: 'bold', color: '#222' }}>
        Fight Results
      </Title>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 16, elevation: 2 }}>
            <Card.Content>
              <Title style={{ fontSize: 20, marginBottom: 4 }}>
                {item.boxer1} vs {item.boxer2}
              </Title>
              <Paragraph style={{ fontSize: 16, color: '#555' }}>
                Winner: {item.winner} by {item.method}
              </Paragraph>
              <Paragraph style={{ fontSize: 16, color: '#555' }}>
                Date: {item.date} - {item.location}
              </Paragraph>
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}
