import { useState } from 'react';
import './MainContainer.css';
import { useSettingsContext } from '../../contexts/SettingsContext';
import { TabFolderProvider } from '../../contexts/TabFolderContext';
import { DragProvider } from '../../contexts/DragContext';
import LeftPanel from './leftPanel/LeftPanel';
import RightPanel from './rightPanel/RightPanel';
import SettingsModal from './modal/SettingsModal';

const MainContainer = () => {
  const settings = useSettingsContext();

  const [showSettings, setShowSettings] = useState(false);

  return (
    <TabFolderProvider>
      <DragProvider>
        <div className={`main-container ${settings.theme}`}>
          <div className='left-panel-container'>
            <LeftPanel setShowSettings={setShowSettings}/>
          </div>
          <div className='right-panel-container'>
            <RightPanel/>
          </div>

          {showSettings && (
            <SettingsModal setShowSettings={setShowSettings}/>
          )}
        </div>
      </DragProvider>
    </TabFolderProvider>
  );
};

export default MainContainer;
