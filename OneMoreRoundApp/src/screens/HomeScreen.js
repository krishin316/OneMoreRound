import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DataService from '../services/DataService';

export default function HomeScreen({ navigation }) {
  const [fights, setFights] = useState([]);

  useEffect(() => {
    setFights(DataService.getUpcomingFights());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Fights</Text>
      <FlatList
        data={fights}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('FightSummary', { fightId: item.id })}>
            <View style={styles.card}>
              <Text style={styles.fightText}>{item.boxer1} vs {item.boxer2}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { padding: 16, marginBottom: 12, backgroundColor: '#f2f2f2', borderRadius: 8 },
  fightText: { fontSize: 18 },
  dateText: { fontSize: 14, color: '#888' },
});
