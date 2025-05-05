import { useState } from "react";
import useChromeTabs from "../../hooks/useChromeTabs";
import TabItem from "./tabItem";

const TabList = () => {
  const { chromeTabs, loading, error, refreshTabs } = useChromeTabs();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (tabId: number) => {
    setSelectedIds((prev) =>
      prev.includes(tabId)
        ? prev.filter((id) => id !== tabId)
        : [...prev, tabId]
    );
  };

  return (
    <div>
      <header>
        <button onClick={refreshTabs}>Refresh Tabs</button>
      </header>

      {loading && <p>Loading tabs...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

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

      <div style={{ marginTop: '10px' }}>
        <button
          onClick={() => {
            console.log('Saving tabs:', selectedIds);
          }}
          disabled={selectedIds.length === 0}
        >
          Save Selected
        </button>
        <button
          onClick={() => {
            const allTabIds = chromeTabs.map((t) => t.id!);
            console.log('Saving all tabs:', allTabIds);
          }}
          style={{ marginLeft: '10px' }}
        >
          Save All
        </button>
      </div>
    </div>
  );
};

export default TabList;