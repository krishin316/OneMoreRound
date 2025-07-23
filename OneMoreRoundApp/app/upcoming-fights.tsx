import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import DataService from '../src/services/DataService';

export default function UpcomingFightsScreen() {
  const router = useRouter();
  const fights = DataService.getUpcomingFights();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6', padding: 16 }}>
      <Title style={{ marginBottom: 16, fontSize: 28, fontWeight: 'bold', color: '#222' }}>
        Upcoming Fights
      </Title>
      <FlatList
        data={fights}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const localDate = new Date(item.date + 'T00:00:00Z').toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: timeZone
          });
          return (
            <TouchableOpacity onPress={() => router.push({ pathname: '/fight-summary/[id]', params: { id: item.id } })}>
              <Card style={{ marginBottom: 16, elevation: 2 }}>
                <Card.Content>
                  <Title style={{ fontSize: 20, marginBottom: 4 }}>
                    {item.boxer1} vs {item.boxer2}
                  </Title>
                  <Paragraph style={{ fontSize: 16, color: '#555' }}>
                    {localDate} - {item.location}
                  </Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}
