import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import DataService from '../src/services/DataService';

export default function SearchBoxerScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const boxers = DataService.searchBoxers(query);
  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6', padding: 16 }}>
      <Title style={{ marginBottom: 16, fontSize: 28, fontWeight: 'bold', color: '#222' }}>
        Search for a Boxer
      </Title>
      <TextInput
        style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16 }}
        placeholder="Type a boxer's name..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={boxers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push({ pathname: '/boxer-profile/[id]', params: { id: item.id } })}>
            <Card style={{ marginBottom: 16, elevation: 2 }}>
              <Card.Content>
                <Title style={{ fontSize: 20, marginBottom: 4 }}>{item.name}</Title>
                <Paragraph style={{ fontSize: 16, color: '#555' }}>Wins: {item.wins} | Losses: {item.losses}</Paragraph>
                <Paragraph style={{ fontSize: 16, color: '#555' }}>{item.bio}</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}
