import { useEffect, useState } from 'react';
import { tabFolderData } from '../../../types';
import RightHeader from './RightHeader';
import TabFolderList from './TabFolderList';

export default function RightPanel() {
  const [tabFolders, setTabFolders] = useState<tabFolderData[]>([]);

  // only useEffect once on initial render
  // update state and update chrome storage date when tab folder data changes
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

  return (
    <div>
      <RightHeader/>
      <TabFolderList 
        tabFolders={tabFolders}
      />
    </div>
  );
}
