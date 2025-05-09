import './index.css';
import { TabFolder } from '../../../types';
import TabItem from '../../tabItem';
import { useState } from 'react';

type TabFolderProps = {
	folder: TabFolder;
};

const TabFolderItem = (tabFolder: TabFolderProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (tabId: number) => {
    setSelectedIds((prev) =>
      prev.includes(tabId) ? prev.filter((id) => id !== tabId) : [...prev, tabId]
    );
  }; 

  return (
    <ul>
      {tabFolder.folder.tabs.map((tab) => (
        <TabItem
          key={tab.id}
          tab={tab}
          selected={selectedIds.includes(tab.id!)}
          toggleSelect={toggleSelect}
        />
      ))}
    </ul>
  );
};

export default TabFolderItem;
