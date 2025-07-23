import React, { useCallback } from 'react';
import { Button } from 'react-native-paper';
import { addPrediction } from '../../services/PredictionDB';
// ...other imports...

interface FightSummaryScreenProps {
  fightData: { title: string };
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

  // ...existing code for UI, call handleSubmitPrediction on submit...
  return (
    <Button mode="contained" onPress={handleSubmitPrediction}>
      Submit Prediction
    </Button>
    // ...existing code...
  );
};

export default FightSummaryScreen;
// ...existing code...
