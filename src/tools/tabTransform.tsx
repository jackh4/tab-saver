import { TabData } from '../types';

const toSavedTab = (tab: chrome.tabs.Tab): TabData | null => {
  // if (tab.id === undefined || tab.url === undefined) return null;

  return {
    id: tab.id,
    favIconUrl: tab.favIconUrl,
    title: tab.title ?? 'No title',
    url: tab.url ?? 'placeholder url',
    savedAt: new Date().toISOString(),
  };
};
  
export const toSavedTabs = (tabs: chrome.tabs.Tab[]): TabData[] => {
  return tabs.map(toSavedTab).filter((tab): tab is TabData => tab !== null);
};
