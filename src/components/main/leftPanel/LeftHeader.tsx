import { useState } from 'react';
import './styles/LeftHeader.css';
import { tabFolderData, windowTabData } from '../../../types';

type LeftHeaderProps = {
  windowTabs: windowTabData[];
  selectedTabIds: string[];
};

const LeftHeader = ({ 
  windowTabs, 
  selectedTabIds 
}: LeftHeaderProps) => {
  const [folderTitle, setFolderTitle] = useState('');

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

    chrome.storage.local.get(['tabFolders'], (result) => {
      const existingFolders: tabFolderData[] = Array.isArray(result.tabFolders)
        ? result.tabFolders
        : [];

      const updatedFolders = [...existingFolders, newFolder];

      chrome.storage.local.set({ tabFolders: updatedFolders }, () => {
        console.log('Saved tab folder to chrome.storage.local:', newFolder);
        setFolderTitle('');
      });
    });
  };

  return (
    <div className='left-header-container'>
      <input
        placeholder='Folder Title'
        value={folderTitle}
        onChange={(e) => setFolderTitle(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button>Settings</button>
    </div>
  );
};

export default LeftHeader;
