import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { Fighter, getFighterById } from '../../services/BoxingApiService';
import { addPrediction } from '../../services/PredictionStorage';
// ...other imports...

interface FightSummaryScreenProps {
  fightData: { title: string; boxerId: string };
  selectedBoxer: string;
  selectedMethod: string;
  navigation: {
    navigate: (route: string) => void;
    // ...other navigation methods if needed
  };
}

/**
 * @param {{ fightData: { title: string }, selectedBoxer: string, selectedMethod: string, navigation: any }} props
 */
const FightSummaryScreen: React.FC<FightSummaryScreenProps> = ({ fightData, selectedBoxer, selectedMethod, navigation }) => {
  const [boxer, setBoxer] = useState<Fighter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchBoxer() {
      setLoading(true);
      setError('');
      try {
        // Assume fightData.boxerId is the selected boxer's id
        const data = await getFighterById(fightData.boxerId);
        setBoxer(data);
      } catch (e) {
        setError('Boxer not found');
      } finally {
        setLoading(false);
      }
    }
    if (fightData.boxerId) fetchBoxer();
  }, [fightData.boxerId]);

  const handleSubmitPrediction = useCallback(async () => {
    try {
      await addPrediction({
        fight: fightData.title,
        pick: selectedBoxer,
        method: selectedMethod,
        result: null // result is unknown at submission
      });
      // Optionally navigate or show feedback
      if (navigation) navigation.navigate('my-predictions');
    } catch (e) {
      console.log('Error saving prediction:', e);
    }
  }, [fightData, selectedBoxer, selectedMethod, navigation]);

  return (
    <>
      <Button mode="contained" onPress={handleSubmitPrediction}>
        Submit Prediction
      </Button>
      {loading ? (
        <Button disabled>Loading Boxer...</Button>
      ) : error || !boxer ? (
        <Paragraph>{error || 'No boxer selected.'}</Paragraph>
      ) : (
        <Card style={{ marginVertical: 16 }}>
          <Card.Content>
            <Title>{boxer.name}</Title>
            <Paragraph>Nationality: {boxer.nationality}</Paragraph>
            <Paragraph>Division: {boxer.division.name}</Paragraph>
            <Paragraph>Height: {boxer.height}</Paragraph>
            <Paragraph>Reach: {boxer.reach}</Paragraph>
            <Paragraph>Stance: {boxer.stance}</Paragraph>
            <Paragraph>Wins: {boxer.stats.wins}</Paragraph>
            <Paragraph>Losses: {boxer.stats.losses}</Paragraph>
            <Paragraph>Draws: {boxer.stats.draws}</Paragraph>
            <Paragraph>Total Bouts: {boxer.stats.total_bouts}</Paragraph>
            <Paragraph>KO Wins: {boxer.stats.ko_wins} ({boxer.stats.ko_percentage}%)</Paragraph>
            <Paragraph>Debut: {boxer.debut}</Paragraph>
          </Card.Content>
        </Card>
      )}
      {/* ...existing code... */}
    </>
  );
};

export default FightSummaryScreen;
// ...existing code...
