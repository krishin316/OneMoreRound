import { initPredictionTable } from './src/services/PredictionDB';
initPredictionTable(); // Ensure table is created before React runs

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
