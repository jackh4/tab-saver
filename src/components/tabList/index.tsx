import { useState } from "react";
import useChromeTabs from "../../hooks/useChromeTabs";
import TabItem from "./tabItem";
import './index.css';

const TabList = () => {
  const { chromeTabs, loading, error, refreshTabs } = useChromeTabs();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (tabId: number) => {
    setSelectedIds((prev) =>
      prev.includes(tabId) ? prev.filter((id) => id !== tabId) : [...prev, tabId]
    );
  };

  return (
    <div className="tab-list">
      <header className="tab-list__header">
        <button onClick={refreshTabs}>Refresh Tabs</button>
      </header>

      {loading && <p className="tab-list__status">Loading tabs...</p>}
      {error && <p className="tab-list__error">{error}</p>}

      <ul>
        {chromeTabs.map((tab) => (
          <TabItem
            key={tab.id}
            tab={tab}
            selected={selectedIds.includes(tab.id!)}
            toggleSelect={toggleSelect}
          />
        ))}
      </ul>

      <div className="tab-list__actions">
        <button
          className="tab-list__button"
          onClick={() => {
            console.log("Saving tabs:", selectedIds);
          }}
          disabled={selectedIds.length === 0}
        >
          Save Selected
        </button>
        <button
          className="tab-list__button"
          onClick={() => {
            const allTabIds = chromeTabs.map((t) => t.id!);
            console.log("Saving all tabs:", allTabIds);
          }}
        >
          Save All
        </button>
      </div>
    </div>
  );
};

export default TabList;
