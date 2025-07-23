import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { Fighter, getFighterById } from '../../src/services/BoxingApiService';

export default function BoxerProfileScreen() {
  const { id } = useLocalSearchParams();
  const [boxer, setBoxer] = useState<Fighter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchBoxer() {
      setLoading(true);
      setError('');
      try {
        const data = await getFighterById(id as string);
        setBoxer(data);
      } catch (e) {
        setError('Boxer not found');
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBoxer();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 32 }} />;
  }
  if (error || !boxer) {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Boxer not found</Title>
        <Paragraph>{error || 'Invalid boxer ID.'}</Paragraph>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>{boxer.name}</Title>
      <Card style={styles.card}>
        <Card.Content>
          <Paragraph>Age: {boxer.age}</Paragraph>
          <Paragraph>Gender: {boxer.gender || 'N/A'}</Paragraph>
          <Paragraph>Nationality: {boxer.nationality}</Paragraph>
          <Paragraph>Nickname: {boxer.nickname || 'N/A'}</Paragraph>
          <Paragraph>Height: {boxer.height}</Paragraph>
          <Paragraph>Reach: {boxer.reach}</Paragraph>
          <Paragraph>Stance: {boxer.stance}</Paragraph>
          <Paragraph>Debut: {boxer.debut}</Paragraph>
          <Paragraph>Division: {boxer.division.name} ({boxer.division.slug})</Paragraph>
          <Paragraph>Division ID: {boxer.division.id}</Paragraph>
          <Paragraph>Division Weight (lb): {boxer.division.weight_lb ?? 'N/A'}</Paragraph>
          <Paragraph>Division Weight (kg): {boxer.division.weight_kg ?? 'N/A'}</Paragraph>
          <Paragraph style={{ marginTop: 8, fontWeight: 'bold' }}>Stats:</Paragraph>
          <Paragraph>Wins: {boxer.stats.wins}</Paragraph>
          <Paragraph>Losses: {boxer.stats.losses}</Paragraph>
          <Paragraph>Draws: {boxer.stats.draws}</Paragraph>
          <Paragraph>Total Bouts: {boxer.stats.total_bouts}</Paragraph>
          <Paragraph>Total Rounds: {boxer.stats.total_rounds}</Paragraph>
          <Paragraph>KO Wins: {boxer.stats.ko_wins}</Paragraph>
          <Paragraph>KO Percentage: {boxer.stats.ko_percentage}%</Paragraph>
          <Paragraph>Stopped: {boxer.stats.stopped}</Paragraph>
        </Card.Content>
      </Card>
      {/* Add more details or fight history if available from API */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6f6f6' },
  title: { marginBottom: 16, fontSize: 24, fontWeight: 'bold' },
  card: { marginBottom: 16 },
  historyTitle: { fontSize: 18, marginTop: 16, marginBottom: 8 },
});
