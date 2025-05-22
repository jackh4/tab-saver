import './styles/TabWindowList.css';
import { windowTabData } from '../../../types';
import TabWindow from './TabWindow';

type TabWindowListProps = {
  windowTabs: windowTabData[];
  selectedTabIds: string[];
  setSelectedTabIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const TabWindowList = ({ 
  windowTabs,
  selectedTabIds, 
  setSelectedTabIds 
}: TabWindowListProps) => {
  const allTabIds = windowTabs.flatMap(w => w.tabs.map(t => t.tabId));
  const allSelected = allTabIds.length > 0 && allTabIds.every(id => selectedTabIds.includes(id));

  const toggleTab = (tabId: string) => {
    setSelectedTabIds((prev) => 
      prev.includes(tabId)
        ? prev.filter((id) => id !== tabId)
        : [...prev, tabId]
    );
  };

  const toggleWindow = (tabIds: string[]) => {
    setSelectedTabIds(prev => {
      const allSelected = tabIds.every(id => prev.includes(id));
      return allSelected
        ? prev.filter(id => !tabIds.includes(id))
        : [...prev, ...tabIds.filter(id => !prev.includes(id))];
    });
  };

  const toggleSelectAll = () => {
    setSelectedTabIds(allSelected ? [] : allTabIds);
  };

  return (
    <div className='tab-window-list-container'>
      <div
        onClick={toggleSelectAll}
        className='tab-window-list-selector'
      >
        {allSelected ? 'Unselect All' : 'Select All'}
      </div>

      {windowTabs.map((window) => (
        <TabWindow
          key={window.windowId}
          windowTabData={window}
          selectedTabIds={selectedTabIds}
          toggleTab={toggleTab}
          toggleWindow={toggleWindow}
        />
      ))}
    </div>
  );
};

export default TabWindowList;
