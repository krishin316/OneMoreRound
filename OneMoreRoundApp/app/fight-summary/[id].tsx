import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Paragraph, RadioButton, Text, Title } from 'react-native-paper';
// import DataService from '../../src/services/DataService';
import { addPrediction } from '../../src/services/PredictionStorage';

export default function FightSummaryScreen() {
  const router = useRouter();
  const { event: eventParam } = useLocalSearchParams();
  let fight: any = null;
  try {
    fight = eventParam ? JSON.parse(eventParam as string) : null;
  } catch {
    fight = null;
  }
  if (!fight) {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Fight not found</Title>
        <Paragraph>Invalid fight data.</Paragraph>
      </View>
    );
  }
  const boxer1 = fight.fighters?.fighter_1 || {};
  const boxer2 = fight.fighters?.fighter_2 || {};
  const [selectedWinner, setSelectedWinner] = useState(boxer1.fighter_id || boxer1.id);
  const [method, setMethod] = useState('KO');

  // Handler to navigate to boxer profile
  const handleViewProfile = (boxer: any) => {
    router.push({
      pathname: '/boxer-profile/[id]',
      params: { id: boxer.fighter_id || boxer.id, boxer: JSON.stringify(boxer) }
    });
  };

  const handlePrediction = async () => {
    try {
      await addPrediction({
        fight: `${boxer1.full_name || boxer1.name} vs ${boxer2.full_name || boxer2.name}`,
        pick: selectedWinner === (boxer1.fighter_id || boxer1.id) ? (boxer1.full_name || boxer1.name) : (boxer2.full_name || boxer2.name),
        method,
        result: '',
      });
      alert(`Prediction saved: ${selectedWinner === (boxer1.fighter_id || boxer1.id) ? (boxer1.full_name || boxer1.name) : (boxer2.full_name || boxer2.name)} by ${method}`);
    } catch (e) {
      alert('Failed to save prediction');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Fight Summary</Title>
      <Card style={styles.card}>
        <Card.Content>
          <Title>
            <Text style={styles.link} onPress={() => handleViewProfile(boxer1)}>
              {boxer1.full_name || boxer1.name}
            </Text>
            {' vs '}
            <Text style={styles.link} onPress={() => handleViewProfile(boxer2)}>
              {boxer2.full_name || boxer2.name}
            </Text>
          </Title>
          <Paragraph>Date: {fight.date}</Paragraph>
          <Paragraph>Location: {fight.location}</Paragraph>
          <Paragraph>Status: {fight.status}</Paragraph>
          <Paragraph>Scheduled Rounds: {fight.scheduled_rounds}</Paragraph>
          <Paragraph>Division: {fight.division?.name} ({fight.division?.weight_lb} lbs)</Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.selectionContainer}>
        <Title style={styles.selectTitle}>Who will win?</Title>
        <RadioButton.Group onValueChange={setSelectedWinner} value={selectedWinner}>
          <View style={styles.radioRow}>
            <RadioButton value={boxer1.fighter_id || boxer1.id} />
            <Text>{boxer1.full_name || boxer1.name}</Text>
            <RadioButton value={boxer2.fighter_id || boxer2.id} />
            <Text>{boxer2.full_name || boxer2.name}</Text>
          </View>
        </RadioButton.Group>
        <Title style={styles.selectTitle}>Method</Title>
        <RadioButton.Group onValueChange={setMethod} value={method}>
          <View style={styles.radioRow}>
            <RadioButton value="KO" />
            <Text>KO</Text>
            <RadioButton value="Decision" />
            <Text>Decision</Text>
          </View>
        </RadioButton.Group>
      </View>
      <Button mode="contained" style={styles.button} onPress={handlePrediction}>
        Submit Prediction
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6f6f6' },
  title: { marginBottom: 16, fontSize: 24, fontWeight: 'bold' },
  card: { marginBottom: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statsCardWrapper: { flex: 1, minWidth: 140, paddingHorizontal: 4 },
  statsCard: { marginBottom: 0 },
  selectionContainer: { marginBottom: 16 },
  selectTitle: { fontSize: 18, marginBottom: 8 },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  button: { marginTop: 16 },
  link: { color: '#1976d2', textDecorationLine: 'underline' },
});
