import './index.css';
import TabItem from './tabItem';
import { TabData } from '../../types';

type TabListProps = {
  tabs: TabData[];
  error?: string | null;
  selectedIds: number[];
  toggleSelect: (tabId: number) => void;
  selectAll: (tabIds: number[]) => void;
  clearSelection: () => void;
};

const TabList = ({ 
  tabs, 
  error, 
  selectedIds, 
  toggleSelect, 
  selectAll, 
  clearSelection 
}: TabListProps) => {
  return (
    <div className='tab-list'>
      {/* <header className='tab-list-header'>
        <button onClick={refreshTabs}>Refresh Tabs</button>
      </header> */}

      {/* {loading && <p className='tab-list-status'>Loading tabs...</p>} */}
      {error && <p className='tab-list-error'>{error}</p>}

      <button
        onClick={() => {
          const allTabIds = tabs.map(tab => tab.id!).filter(Boolean);
          const areAllSelected = allTabIds.every(id => selectedIds.includes(id));

          if (areAllSelected) {
            clearSelection();
          } else {
            selectAll(allTabIds);
          }
        }}
      >
        {tabs.every(tab => selectedIds.includes(tab.id!))
          ? 'Unselect All'
          : 'Select All'}
      </button>

      <ul>
        {tabs.map((tab) => (
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

export default TabList;
