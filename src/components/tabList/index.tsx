import './index.css';
import TabItem from '../tabItem';
import { SavedTab, TabFolder } from '../../types';
import useChromeTabs from '../../hooks/useChromeTabs';
import useSelectedTabs from '../../hooks/useSelectedTabs';
import { toSavedTabs } from '../../tools/tabTransform';

const TabList = () => {
  const { chromeTabs, loading, error, refreshTabs } = useChromeTabs();
  const { selectedIds, toggleSelect, clearSelection } = useSelectedTabs();

  const saveTabsToChromeStorage = async (newTabFolder: TabFolder) => {
    try {
      const result = await chrome.storage.local.get(['tabFolders']);
      const tabFolders: TabFolder[] = Array.isArray(result.tabFolders)
        ? [...result.tabFolders]
        : [];

      tabFolders.push(newTabFolder)

      await chrome.storage.local.set({'tabFolders': tabFolders}, () => {
        console.log('Tabs saved to chrome storage: ', tabFolders)
      })
    } catch(err) {
      console.error('Error saving tabs: ', err)
    }
  }

  const createTabFolder = (tabs: SavedTab[], name: string): TabFolder => {
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
  }

  return (
    <div className='tab-list'>
      <header className='tab-list__header'>
        <button onClick={refreshTabs}>Refresh Tabs</button>
      </header>

      {loading && <p className='tab-list__status'>Loading tabs...</p>}
      {error && <p className='tab-list__error'>{error}</p>}

      <ul>
        {toSavedTabs(chromeTabs).map((tab) => (
          <TabItem
            key={tab.id}
            tab={tab}
            selected={selectedIds.includes(tab.id!)}
            toggleSelect={toggleSelect}
          />
        ))}
      </ul>

      <div className='tab-list__actions'>
        <button
          className='tab-list__button'
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
          className='tab-list__button'
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

export default TabList;
