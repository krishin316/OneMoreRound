import { StyleSheet, Text, View } from 'react-native';
import DataService from '../services/DataService';

export default function BoxerProfileScreen({ route }) {
  const { boxerId } = route.params;
  const boxer = DataService.getBoxerById(boxerId);

  if (!boxer) return <View style={styles.container}><Text>Boxer not found.</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{boxer.name}</Text>
      <Text style={styles.bio}>{boxer.bio}</Text>
      <Text style={styles.stats}>Wins: {boxer.wins} | Losses: {boxer.losses}</Text>
      <Text style={styles.historyTitle}>Fight History:</Text>
      {boxer.fightHistory.map(fight => (
        <Text key={fight.id} style={styles.historyItem}>{fight.opponent} - {fight.result}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  bio: { fontSize: 16, marginBottom: 8 },
  stats: { fontSize: 16, marginBottom: 12 },
  historyTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  historyItem: { fontSize: 15, marginBottom: 4 },
});
