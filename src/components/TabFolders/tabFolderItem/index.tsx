import './index.css';
import { TabData, TabFolder } from '../../../types';
import TabList from '../../tabList';

type TabFolderProps = {
	folder: TabFolder;
  selectedIds: number[];
  toggleSelect: (tabId: number) => void;
  selectAll: (tabIds: number[]) => void;
  clearSelection: () => void;
};

const TabFolderItem = ({ 
  folder, 
  selectedIds, 
  toggleSelect, 
  selectAll, 
  clearSelection 
}: TabFolderProps) => {
  const openTabs = (tabsToOpen: TabData[]) => {
    const openInNewWindow = window.confirm(
      'Do you want to open the tabs in a new window?'
    );

    if (openInNewWindow) {
      const urls = tabsToOpen.map(tab => tab.url);
      chrome.windows.create({ url: urls, focused: true });
    } else {
      tabsToOpen.forEach(tab => {
        chrome.tabs.create({ url: tab.url });
      });
    }
  };

  const openSelectedTabs = () => {
    const selectedTabs = folder.tabs.filter(
      (tab) => tab.id && selectedIds.includes(tab.id)
    );
    // selectedTabs.forEach((tab) => chrome.tabs.create({ url: tab.url }));
    openTabs(selectedTabs);
  };

  const openAllTabs = () => {
    // folder.tabs.forEach((tab) => chrome.tabs.create({ url: tab.url }));
    openTabs(folder.tabs);
  };

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
