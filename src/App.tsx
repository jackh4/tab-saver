import './App.css';
import { SettingsProvider } from './contexts/SettingsContext';
import { ToastProvider } from './contexts/ToastContext';
import MainContainer from './components/main/MainContainer';

function App() {
  return (
    <SettingsProvider>
      <ToastProvider>
        <MainContainer/>
      </ToastProvider>
    </SettingsProvider>
  );
}

export default App;
