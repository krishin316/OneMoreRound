import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Paragraph, Surface, TextInput, Title } from 'react-native-paper';
import { BoxingEvent, getUpcomingEvents } from '../src/services/BoxingEventsService';

export default function UpcomingEventsScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f6f6',
      padding: 16,
    },
    title: {
      marginBottom: 16,
      fontSize: 28,
      fontWeight: 'bold',
      color: '#222',
      alignSelf: 'center',
    },
    filterRow: {
      flexDirection: 'row',
      marginBottom: 20,
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 8,
    },
    input: {
      flex: 1,
      marginRight: 8,
      backgroundColor: '#fff',
      height: 24,
      fontSize: 12,
      paddingVertical: 2,
    },
    pickerWrapper: {
      flex: 1,
      marginRight: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
      overflow: 'hidden',
    },
    picker: {
      height: 48,
      width: '100%',
    },
    button: {
      marginRight: 0,
      marginLeft: 8,
      alignSelf: 'stretch',
    },
    loadingWrap: {
      alignItems: 'center',
      marginVertical: 24,
    },
    error: {
      color: 'red',
      marginBottom: 16,
      alignSelf: 'center',
    },
    noEvents: {
      alignSelf: 'center',
      marginTop: 32,
      fontSize: 18,
      color: '#555',
    },
    card: {
      marginVertical: 8,
      elevation: 2,
      backgroundColor: '#fff',
    },
    eventTitle: {
      fontSize: 20,
      marginBottom: 4,
      color: '#222',
    },
  });

  const router = useRouter();
  const [events, setEvents] = useState<BoxingEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState('7');
  const [dateSort, setDateSort] = useState<'ASC' | 'DESC'>('DESC');
  const [pageSize, setPageSize] = useState('10');
  const [pageNum, setPageNum] = useState('1');

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    const params = {
      days: Number(days),
      date_sort: dateSort,
      page_size: Number(pageSize),
      page_num: Number(pageNum),
    };
    try {
      const events = await getUpcomingEvents(params);
      setEvents(events);
    } catch (e: any) {
      setEvents([]);
      setError(e?.message || 'Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Surface style={styles.container}>
      <Title style={styles.title}>Upcoming Boxing Events</Title>
      <View style={styles.filterRow}>
        <TextInput
          label="Days"
          mode="outlined"
          style={styles.input}
          value={days}
          keyboardType="numeric"
          onChangeText={v => setDays(v)}
        />
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={dateSort}
            style={styles.picker}
            onValueChange={(v: 'ASC' | 'DESC') => setDateSort(v)}
          >
            <Picker.Item label="Descending" value="DESC" />
            <Picker.Item label="Ascending" value="ASC" />
          </Picker>
        </View>
        <TextInput
          label="Page Size"
          mode="outlined"
          style={styles.input}
          value={pageSize}
          keyboardType="numeric"
          onChangeText={v => setPageSize(v)}
        />
        <TextInput
          label="Page Num"
          mode="outlined"
          style={styles.input}
          value={pageNum}
          keyboardType="numeric"
          onChangeText={v => setPageNum(v)}
        />
        <Button mode="contained" style={styles.button} onPress={fetchEvents}>Search</Button>
      </View>
      {loading ? (
        <View style={styles.loadingWrap}>
          <Paragraph>Loading events...</Paragraph>
        </View>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : events.length === 0 ? (
        <Text style={styles.noEvents}>No events found.</Text>
      ) : (
        <View style={{ flex: 1, maxHeight: '70%' }}>
          <ScrollView>
            {events.map(event => (
              event ? (
                <Card key={event.id || Math.random()} style={styles.card}>
                  <Card.Content>
                    <Title style={styles.eventTitle}>{event.title || 'No Title'}</Title>
                    <Paragraph>Date: {event.date ? new Date(event.date).toLocaleString() : 'Unknown'}</Paragraph>
                    <Paragraph>Location: {event.location || 'Unknown'}</Paragraph>
                    <Paragraph>Status: {event.status || 'Unknown'}</Paragraph>
                    <Paragraph>Scheduled Rounds: {event.scheduled_rounds ?? 'N/A'}</Paragraph>
                    <Paragraph>Division: {event.division?.name ?? 'N/A'} ({event.division?.weight_lb ?? ''} lbs)</Paragraph>
                    <Paragraph>Fighters:</Paragraph>
                    <Paragraph>1: {event.fighters?.fighter_1?.full_name || event.fighters?.fighter_1?.name || 'Unknown'}</Paragraph>
                    <Paragraph>2: {event.fighters?.fighter_2?.full_name || event.fighters?.fighter_2?.name || 'Unknown'}</Paragraph>
                    {event.titles && event.titles.length > 0 && (
                      <Paragraph>Titles: {event.titles.map(t => t.name).join(', ')}</Paragraph>
                    )}
                    <Paragraph>Event:</Paragraph>
                    <Paragraph>{event.event?.title || 'Unknown'} ({event.event?.location || 'Unknown'})</Paragraph>
                    <Paragraph>Broadcasters:</Paragraph>
                    {(Array.isArray(event.event?.broadcasters) ? event.event.broadcasters : []).map((b, idx) => (
                      <Paragraph key={idx}>{Object.entries(b).map(([country, channel]) => `${country}: ${channel}`).join(', ')}</Paragraph>
                    ))}
                    <Button mode="outlined" style={{ marginTop: 8 }} onPress={() => router.push({ pathname: '/fight-summary/[id]', params: { id: event.id, event: JSON.stringify(event) } })}>
                      View Summary
                    </Button>
                  </Card.Content>
                </Card>
              ) : null
            ))}
          </ScrollView>
        </View>
      )}
    </Surface>
  );
}