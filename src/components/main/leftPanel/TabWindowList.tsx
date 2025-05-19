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
      <label className='tab-window-list-header'>
        <input
          type='checkbox'
          checked={allSelected}
          onChange={toggleSelectAll}
          className='tab-window-list-all-checkbox'
        />
        <div>Select All</div>
      </label>

      <div className='tab-window-list-windows'>
        {windowTabs.map((window) => (
          <TabWindow
            key={window.windowId}
            tabWindowData={window}
            selectedTabIds={selectedTabIds}
            toggleTab={toggleTab}
            toggleWindow={toggleWindow}
          />
        ))}
      </div>
    </div>
  );
};

export default TabWindowList;
