import './styles/LeftPanel.css';
import { useState, useEffect } from 'react';
import LeftHeader from './LeftHeader';
import TabWindowList from './TabWindowList';
import { tabData, windowTabData } from '../../../types';

export default function LeftPanel() {
  const [windowTabs, setWindowTabs] = useState<windowTabData[]>([]);

  /*
  - When the user selects a tab, window data (includes tab data) is added
  - When the user selects a window:
    - Selects all tabs not already selected (if unchecked)
    - Unselects all tabs already selected (if checked)
  - When the user selects all:
    - Selects all tabs not already selected (if unchecked)
    - Unselects all tabs already selected (if checked)
  */
  const [selectedTabIds, setSelectedTabIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchTabsByWindow = async () => {
      const allWindows = await new Promise<chrome.windows.Window[]>((resolve) =>
        chrome.windows.getAll({ populate: true }, resolve)
      );

      const result: windowTabData[] = allWindows.map((win) => {
        const tabs: tabData[] = (win.tabs || []).map((tab) => ({
          type: 'tab',
          tabId: String(tab.id),
          favIcon: tab.favIconUrl || '',
          title: tab.title || '',
          url: tab.url || '',
        }));

        return {
          type: 'window',
          windowId: String(win.id),
          title: tabs[0]?.title || `Window ${win.id}`,
          tabs,
        };
      });
      
      setWindowTabs(result);
    };

    fetchTabsByWindow();
  }, []);

  return (
    <div className='left-panel'>
      <LeftHeader 
        windowTabs={windowTabs}
        selectedTabIds={selectedTabIds} 
      />
      <TabWindowList 
        windowTabs={windowTabs}
        selectedTabIds={selectedTabIds}
        setSelectedTabIds={setSelectedTabIds}
      />
    </div>
  );
}
