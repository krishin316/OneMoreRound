import { Button, StyleSheet, Text, View } from 'react-native';
import DataService from '../services/DataService';

export default function FightDetailScreen({ route, navigation }) {
  const { fightId } = route.params;
  const fight = DataService.getFightById(fightId);

  if (!fight) return <View style={styles.container}><Text>Fight not found.</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{fight.boxer1} vs {fight.boxer2}</Text>
      <Text style={styles.detail}>Date: {fight.date}</Text>
      <Text style={styles.detail}>Location: {fight.location}</Text>
      <Button title={fight.boxer1} onPress={() => navigation.navigate('BoxerProfile', { boxerId: fight.boxer1Id })} />
      <Button title={fight.boxer2} onPress={() => navigation.navigate('BoxerProfile', { boxerId: fight.boxer2Id })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  detail: { fontSize: 16, marginBottom: 8 },
});
