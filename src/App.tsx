import './App.css';
import LeftPanel from './components/main/leftPanel/LeftPanel';
import RightPanel from './components/main/rightPanel/RightPanel';
import { DragProvider } from './contexts/DragContext';
import { TabFolderProvider } from './contexts/TabFolderContext';

function App() {
  return (
    <div className='app-container'>
      <TabFolderProvider>
        <DragProvider>
          <div className='left-panel-container'>
            <LeftPanel/>
          </div>
          <div className='right-panel-container'>
            <RightPanel/>
          </div>
        </DragProvider>
      </TabFolderProvider>
    </div>
  );
}

export default App;
