import './App.css';
import { SettingsProvider } from './contexts/SettingsContext';
import MainContainer from './components/main/MainContainer';

function App() {
  return (
    <SettingsProvider>
      <MainContainer/>
    </SettingsProvider>
  );
}

export default App;
