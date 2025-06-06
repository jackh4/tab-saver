import { nanoid } from 'nanoid';
import './styles/LeftHeader.css';
import { tabFolderData, windowTabData } from '../../../types';
import { useTabFolderDispatch } from '../../../contexts/TabFolderContext';
import Icon from '../../common/Icon';

type LeftHeaderProps = {
  windowTabs: windowTabData[];
  folderTitle: string;
  setFolderTitle: (title: string) => void;
  selectedTabIds: string[];
  setSelectedTabIds: (tabIds: string[]) => void;
  setShowSettings: (showSettings: boolean) => void;
};

const LeftHeader = ({ 
  windowTabs, 
  folderTitle,
  setFolderTitle,
  selectedTabIds,
  setSelectedTabIds,
  setShowSettings,
}: LeftHeaderProps) => {
  const dispatch = useTabFolderDispatch();

  const handleSave = () => {
    if (!selectedTabIds.length) {
      console.warn('Please select tabs to be saved');
      return;
    }

    const selectedWindows: windowTabData[] = windowTabs.map(window => {
      const filteredTabs = window.tabs.filter(tab => 
        selectedTabIds.includes(tab.tabId)).map(tab => ({
        ...tab,
        tabId: nanoid(),
      }));

      return filteredTabs.length > 0
        ? {
          ...window,
          windowId: nanoid(),
          tabCount: filteredTabs.length,
          tabs: filteredTabs,
        } 
        : null;
    }).filter(Boolean) as windowTabData[];

    const title = folderTitle.trim() ? folderTitle.trim() : 'Tab Folder';
    const totalTabCount = selectedWindows.reduce(
      (count: number, window) => count + window.tabCount, 0
    );

    const newFolder: tabFolderData = {
      tabFolderId: nanoid(),
      title: title,
      date: new Date().toISOString(),
      windowCount: selectedWindows.length,
      tabCount: totalTabCount,
      windows: selectedWindows,
    };

    dispatch({ type: 'ADD_FOLDER', payload: newFolder });
    setSelectedTabIds([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    };
  };

  return (
    <div className='left-header-container'>
      <input
        placeholder='Folder Title'
        value={folderTitle}
        onChange={(e) => setFolderTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        className='left-header-title-input'
      />
      <button 
        title='Save selected tabs'
        onClick={handleSave}
        className='left-header-save-button'
      >
        Save
      </button>
      <Icon
        materialIconName='settings'
        tooltipText='Open settings'
        onClick={() => setShowSettings(true)}
      />
    </div>
  );
};

export default LeftHeader;
