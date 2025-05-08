import { useState } from "react";
import useChromeTabs from "../../hooks/useChromeTabs";
import TabItem from "../tabItem";
import { SavedTab, TabFolder } from "../../types";
import './index.css';

const TabList = () => {
  const { chromeTabs, loading, error, refreshTabs } = useChromeTabs();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (tabId: number) => {
    setSelectedIds((prev) =>
      prev.includes(tabId) ? prev.filter((id) => id !== tabId) : [...prev, tabId]
    );
  };

  const toSavedTab = (tab: chrome.tabs.Tab): SavedTab | null => {
    if (tab.id === undefined || tab.url === undefined) return null;
  
    return {
      id: tab.id,
      favIconUrl: tab.favIconUrl,
      title: tab.title ?? 'No title',
      url: tab.url,
      savedAt: new Date().toISOString(),
    };
  };
  
  const toSavedTabs = (tabs: chrome.tabs.Tab[]): SavedTab[] => {
    return tabs.map(toSavedTab).filter((tab): tab is SavedTab => tab !== null);
  };
  

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

  return (
    <div className="tab-list">
      <header className="tab-list__header">
        <button onClick={refreshTabs}>Refresh Tabs</button>
      </header>

      {loading && <p className="tab-list__status">Loading tabs...</p>}
      {error && <p className="tab-list__error">{error}</p>}

      {/* Convert chrome.tabs.tab type to TabItem type */}
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

      {/* TODO: Create function for onClick create tab folder */}
      <div className="tab-list__actions">
        <button
          className="tab-list__button"
          onClick={() => {
            const selectedTabs = chromeTabs.filter(tab => selectedIds.includes(tab.id!));
            const session: TabFolder = {
              id: crypto.randomUUID(),
              name: "Placeholder - Selected Tabs",
              date: new Date(),
              tabs: selectedTabs.map(tab => ({
                // TODO: ensure tab id exists
                id: tab.id,
                favIconUrl: tab.favIconUrl,
                title: tab.title || 'No title',
                url: tab.url || '',
                savedAt: new Date().toISOString(),
              })),
            };

            saveTabsToChromeStorage(session);
          }}
          disabled={selectedIds.length === 0}
        >
          Save Selected
        </button>

        <button
          className="tab-list__button"
          onClick={() => {
            const session: TabFolder = {
              id: crypto.randomUUID(),
              name: "Placeholder - All Tabs",
              date: new Date(),
              tabs: chromeTabs.map(tab => ({
                // TODO: ensure tab id exists
                id: tab.id,
                favIconUrl: tab.favIconUrl,
                title: tab.title || 'No title',
                url: tab.url || '',
                savedAt: new Date().toISOString(),
              })),
            };

            saveTabsToChromeStorage(session);
          }}
        >
          Save All
        </button>
      </div>
    </div>
  );
};

export default TabList;
