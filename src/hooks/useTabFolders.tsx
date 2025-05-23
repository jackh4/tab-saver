import { useEffect, useState } from 'react';
import { tabFolderData } from '../types';

const useTabFolders = () => {
  const [tabFolders, setTabFolders] = useState<tabFolderData[]>([]);

  // update TabFolder state
  
  useEffect(() => {
    const fetchTabFolders = async () => {
      const tabFolders: tabFolderData[] = await new Promise((resolve) => {
        chrome.storage.local.get(['tabFolders'], (result) => {
          resolve(Array.isArray(result.tabFolders) ? result.tabFolders : []);
        });
      });

      setTabFolders(tabFolders);
    };

    fetchTabFolders();
  }, []);

  return { tabFolders };
};

export default useTabFolders;
