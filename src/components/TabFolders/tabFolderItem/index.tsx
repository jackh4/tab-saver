import './index.css';
import { TabFolder } from '../../../types';
import TabItem from '../../tabItem';
import useSelectedTabs from '../../../hooks/useSelectedTabs';

type TabFolderProps = {
	folder: TabFolder;
};

const TabFolderItem = ({ folder }: TabFolderProps) => {
  const { selectedIds, toggleSelect } = useSelectedTabs();

  const openSelectedTabs = () => {
    const selectedTabs = folder.tabs.filter(
      (tab) => tab.id && selectedIds.includes(tab.id)
    );
    selectedTabs.forEach((tab) => chrome.tabs.create({ url: tab.url }));
  };

  const openAllTabs = () => {
    folder.tabs.forEach((tab) => chrome.tabs.create({ url: tab.url }));
  };

  // TODO: enable delete specific tab

  return (
    <div>
      <div className='tab-folder-actions'>
        <button 
          onClick={openSelectedTabs} 
          disabled={selectedIds.length === 0}>
            Open Selected Tabs
        </button>
        <button onClick={openAllTabs}>Open All Tabs</button>
      </div>
      <ul>
        {folder.tabs.map((tab) => (
          <TabItem
            key={tab.id}
            tab={tab}
            selected={selectedIds.includes(tab.id!)}
            toggleSelect={toggleSelect}
          />
        ))}
      </ul>
    </div>
  );
};

export default TabFolderItem;
