import { useEffect, useState } from 'react';
import { TabFolder } from '../../types';
import TabFolders from '../tabFolders';

const SavedTabsPanel = () => {
  const [tabFolders, setTabFolders] = useState<TabFolder[]>([]);

  const getTabFolders = () => {
    if (typeof chrome !== 'undefined' && chrome.storage?.local) {
      chrome.storage.local.get(['tabFolders'], (result) => {
        const folders = Array.isArray(result.tabFolders) ? result.tabFolders : [];
        setTabFolders(folders);
      });
    } else {
      console.log(chrome);
      console.warn('chrome.storage.local is not available');
    }
  };

  useEffect(() => {
    getTabFolders();
  }, [tabFolders]);

  return (
    <div>
      <h2>Saved Tab Folders</h2>
      <TabFolders tabFolders={tabFolders} setTabFolders={setTabFolders}/>
    </div>
  );
};

export default SavedTabsPanel;
