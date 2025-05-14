import './index.css';
import { TabFolder } from '../../../types';
import useSelectedTabs from '../../../hooks/useSelectedTabs';
import TabList from '../../tabList';

type TabFolderProps = {
	folder: TabFolder;
};

const TabFolderItem = ({ folder }: TabFolderProps) => {
  const { selectedIds, toggleSelect, selectAll, clearSelection } = useSelectedTabs();

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
      <TabList
        tabs={folder.tabs}
        selectedIds={selectedIds}
        toggleSelect={toggleSelect}
        selectAll={selectAll} 
        clearSelection={clearSelection}
      />
    </div>
  );
};

export default TabFolderItem;
