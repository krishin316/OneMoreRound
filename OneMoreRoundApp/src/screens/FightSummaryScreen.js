import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Paragraph, RadioButton, Text, Title } from 'react-native-paper';
import DataService from '../services/DataService';

export default function FightSummaryScreen({ route, navigation }) {
  const { fightId } = route.params;
  const fight = DataService.getFightById(fightId);
  const boxer1 = DataService.getBoxerById(fight.boxer1Id);
  const boxer2 = DataService.getBoxerById(fight.boxer2Id);

  const [selectedWinner, setSelectedWinner] = useState(fight.boxer1Id);
  const [method, setMethod] = useState('KO');

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Fight Summary</Title>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{fight.boxer1} vs {fight.boxer2}</Title>
          <Paragraph>Date: {fight.date}</Paragraph>
          <Paragraph>Location: {fight.location}</Paragraph>
        </Card.Content>
      </Card>
      <View style={styles.statsRow}>
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title>{boxer1.name}</Title>
            <Paragraph>Wins: {boxer1.wins}</Paragraph>
            <Paragraph>Losses: {boxer1.losses}</Paragraph>
            <Paragraph>{boxer1.bio}</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.statsCard}>
          <Card.Content>
            <Title>{boxer2.name}</Title>
            <Paragraph>Wins: {boxer2.wins}</Paragraph>
            <Paragraph>Losses: {boxer2.losses}</Paragraph>
            <Paragraph>{boxer2.bio}</Paragraph>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.selectionContainer}>
        <Title style={styles.selectTitle}>Who will win?</Title>
        <RadioButton.Group onValueChange={setSelectedWinner} value={selectedWinner}>
          <View style={styles.radioRow}>
            <RadioButton value={boxer1.id} />
            <Text>{boxer1.name}</Text>
            <RadioButton value={boxer2.id} />
            <Text>{boxer2.name}</Text>
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
      <Button mode="contained" style={styles.button} onPress={() => alert(`You picked ${selectedWinner} by ${method}`)}>
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
  statsCard: { flex: 1, marginHorizontal: 4 },
  selectionContainer: { marginBottom: 16 },
  selectTitle: { fontSize: 18, marginBottom: 8 },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  button: { marginTop: 16 },
});
