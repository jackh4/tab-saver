import './App.css';
import LeftPanel from './components/main/leftPanel/LeftPanel';
import RightPanel from './components/main/rightPanel/RightPanel';
import { DragProvider } from './contexts/DragContext';

function App() {
  return (
    <div className='app-container'>
      <DragProvider>
        <div className='left-panel-container'>
          <LeftPanel/>
        </div>
        <div className='right-panel-container'>
          <RightPanel/>
        </div>
      </DragProvider>
    </div>
  );
}

export default App;
