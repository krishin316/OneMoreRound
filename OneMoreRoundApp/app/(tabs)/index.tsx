// Removed Luxon, use native JS Date
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card, Provider as PaperProvider, Paragraph, Title } from 'react-native-paper';
import DataService from '../../src/services/DataService';

export default function HomeScreen() {
  const router = useRouter();
  type Fight = {
    id: string;
    boxer1: string;
    boxer2: string;
    boxer1Id: string;
    boxer2Id: string;
    date: string;
    location: string;
  };
  const [fights, setFights] = useState<Fight[]>([]);

  useEffect(() => {
    setFights(DataService.getUpcomingFights());
  }, []);

  // Get device timezone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: '#f6f6f6', padding: 16 }}>
        <Title style={{ marginBottom: 16, fontSize: 28, fontWeight: 'bold', color: '#222' }}>
          One More Round
        </Title>
        <View style={{ marginBottom: 24 }}>
          <TouchableOpacity onPress={() => router.push('/upcoming-events')}>
            <Card style={{ marginBottom: 12, elevation: 2 }}>
              <Card.Content>
                <Title>Upcoming Events</Title>
                <Paragraph>See the schedule of upcoming boxing events with filters.</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/fight-results')}>
            <Card style={{ marginBottom: 12, elevation: 2 }}>
              <Card.Content>
                <Title>Fight Results</Title>
                <Paragraph>View results of recent fights.</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/search-boxer')}>
            <Card style={{ marginBottom: 12, elevation: 2 }}>
              <Card.Content>
                <Title>Search for a Boxer</Title>
                <Paragraph>Find boxer profiles and stats.</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/my-predictions')}>
            <Card style={{ marginBottom: 12, elevation: 2 }}>
              <Card.Content>
                <Title>My Predictions</Title>
                <Paragraph>See your prediction summary and accuracy.</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
}
// ...existing code...
