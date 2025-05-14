import './index.css';
import { TabData, TabFolder } from '../../types';
import useChromeTabs from '../../hooks/useChromeTabs';
import useSelectedTabs from '../../hooks/useSelectedTabs';
import { toSavedTabs } from '../../tools/tabTransform';
import TabList from '../tabList';

const CurrentTabsPanel = () => {
  const { chromeTabs, error } = useChromeTabs();
  const { selectedIds, toggleSelect, selectAll, clearSelection } = useSelectedTabs();

  const saveTabsToChromeStorage = async (newTabFolder: TabFolder) => {
    try {
      const result = await chrome.storage.local.get(['tabFolders']);
      const tabFolders: TabFolder[] = Array.isArray(result.tabFolders)
        ? [...result.tabFolders]
        : [];

      tabFolders.push(newTabFolder);

      await chrome.storage.local.set({'tabFolders': tabFolders}, () => {
        console.log('Tabs saved to chrome storage: ', tabFolders);
      });
    } catch(err) {
      console.error('Error saving tabs: ', err);
    }
  };

  const createTabFolder = (tabs: TabData[], name: string): TabFolder => {
    const tabFolder: TabFolder = {
      id: crypto.randomUUID(),
      name: name,
      date: new Date(),
      tabs: tabs.map(tab => ({
        id: tab.id,
        favIconUrl: tab.favIconUrl,
        title: tab.title || 'No title',
        url: tab.url || '',
        savedAt: new Date().toISOString(),
      })),
    };
    return tabFolder;
  };

  return (
    <div className='current-tabs-panel'>
      <TabList
        tabs={toSavedTabs(chromeTabs)}
        error={error}
        selectedIds={selectedIds}
        toggleSelect={toggleSelect}
        selectAll={selectAll} 
        clearSelection={clearSelection}
      />

      <div className='current-tabs-panel-actions'>
        <button
          className='current-tabs-panel-button'
          onClick={() => {
            const selectedTabs = toSavedTabs(chromeTabs).filter(tab => selectedIds.includes(tab.id!));
            const tabFolder = createTabFolder(selectedTabs, 'Selected Tabs');
            saveTabsToChromeStorage(tabFolder);
            clearSelection();
          }}
          disabled={selectedIds.length === 0}
        >
          Save Selected
        </button>

        <button
          className='current-tabs-panel-button'
          onClick={() => {
            const tabFolder = createTabFolder(toSavedTabs(chromeTabs), 'Selected Tabs');
            saveTabsToChromeStorage(tabFolder);
            clearSelection();
          }}
        >
          Save All
        </button>
      </div>
    </div>
  );
};

export default CurrentTabsPanel;
