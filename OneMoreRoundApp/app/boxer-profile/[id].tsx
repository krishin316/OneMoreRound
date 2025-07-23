import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import DataService from '../../src/services/DataService';

export default function BoxerProfileScreen() {
  const { id } = useLocalSearchParams();
  const boxer = DataService.getBoxerById(id);
  if (!boxer) {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Boxer not found</Title>
        <Paragraph>Invalid boxer ID.</Paragraph>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Title style={styles.title}>{boxer.name}</Title>
      <Card style={styles.card}>
        <Card.Content>
          <Paragraph>{boxer.bio}</Paragraph>
          <Paragraph>Wins: {boxer.wins}</Paragraph>
          <Paragraph>Losses: {boxer.losses}</Paragraph>
        </Card.Content>
      </Card>
      <Title style={styles.historyTitle}>Fight History</Title>
      {boxer.fightHistory.map(fight => (
        <Paragraph key={fight.id}>{fight.opponent} - {fight.result}</Paragraph>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6f6f6' },
  title: { marginBottom: 16, fontSize: 24, fontWeight: 'bold' },
  card: { marginBottom: 16 },
  historyTitle: { fontSize: 18, marginTop: 16, marginBottom: 8 },
});
