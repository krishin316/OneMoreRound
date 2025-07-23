import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Button as RNButton, TextInput, TouchableOpacity, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { Fighter, searchFightersByName } from '../src/services/BoxingApiService';

export default function SearchBoxerScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setError('Please enter a boxer name to search.');
      return;
    }
    setError('');
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchFightersByName(trimmedQuery);
      setFighters(data);
    } catch (e) {
      setFighters([]);
      setError('Error searching fighters.');
      console.log('Error searching fighters:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6', padding: 16 }}>
      <Title style={{ marginBottom: 16, fontSize: 28, fontWeight: 'bold', color: '#222' }}>
        Search for a Boxer
      </Title>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TextInput
          style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 16 }}
          placeholder="Type a boxer's name..."
          value={query}
          onChangeText={setQuery}
        />
        <RNButton title="Search" onPress={handleSearch} disabled={loading || !query.trim()} />
      </View>
      {error ? <Paragraph style={{ color: 'red', marginBottom: 8 }}>{error}</Paragraph> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#222" style={{ marginTop: 32 }} />
      ) : searched && fighters.length === 0 && !error ? (
        <Paragraph>No boxers found.</Paragraph>
      ) : (
        <FlatList
          data={fighters}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push({ pathname: '/boxer-profile/[id]', params: { id: item.id } })}>
              <Card style={{ marginBottom: 16, elevation: 2 }}>
                <Card.Content>
                  <Title style={{ fontSize: 20, marginBottom: 4 }}>{item.name}</Title>
                  <Paragraph style={{ fontSize: 16, color: '#555' }}>Wins: {item.stats.wins} | Losses: {item.stats.losses}</Paragraph>
                  <Paragraph style={{ fontSize: 16, color: '#555' }}>{item.nationality} | {item.division.name}</Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}
