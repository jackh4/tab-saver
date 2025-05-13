import { useEffect, useState } from 'react';
import { TabFolder } from '../../types';
import TabFolderItem from './tabFolderItem';

const SavedTabFolders = () => {
  const [tabFolders, setTabFolders] = useState<TabFolder[]>([]);
  
  // TODO: delete tab folder from storage

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

      {tabFolders.length === 0 ? (
        <p>No tab folders found.</p>
      ) : (
        tabFolders.map((folder) => (
          <div key={folder.id}>
            <h3>{folder.name}</h3>
            <p>{new Date(folder.date).toLocaleString()}</p>
            <TabFolderItem key={folder.id} folder={folder}/>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedTabFolders;
