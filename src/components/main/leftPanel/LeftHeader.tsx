import { useState } from 'react';
import './styles/LeftHeader.css';
import { tabFolderData, windowTabData } from '../../../types';
import { useTabFolderDispatch } from '../../../contexts/TabFolderContext';

type LeftHeaderProps = {
  windowTabs: windowTabData[];
  selectedTabIds: string[];
};

const LeftHeader = ({ 
  windowTabs, 
  selectedTabIds 
}: LeftHeaderProps) => {
  const [folderTitle, setFolderTitle] = useState('');

  const dispatch = useTabFolderDispatch();

  const handleSave = () => {
    if (!folderTitle.trim()) {
      console.warn('Folder title is required.');
      return;
    }

    // change window title to title of the first selected tab
    // case that the initial set window title from the first tab is not selected

    const selectedWindows: windowTabData[] = windowTabs
      .map(window => {
        const filteredTabs = window.tabs.filter(tab => selectedTabIds.includes(tab.tabId));
        return filteredTabs.length > 0 ? { ...window, tabs: filteredTabs } : null;
      })
      .filter(Boolean) as windowTabData[];

    const newFolder: tabFolderData = {
      tabFolderId: `folder-${Date.now()}`,
      title: folderTitle.trim(),
      date: new Date().toISOString(),
      windows: selectedWindows,
    };

    dispatch({ type: 'ADD_FOLDER', payload: newFolder });
    setFolderTitle('');
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
      <button onClick={handleSave}>Save</button>

      <div className='material-symbols-outlined'>
        settings
      </div>
    </div>
  );
};

export default LeftHeader;
