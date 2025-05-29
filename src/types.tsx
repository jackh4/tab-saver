export interface tabData {
  type: 'tab';
  tabId: string;
  favIcon: string;
  title: string;
  url: string;
}

export interface windowTabData {
  type: 'window';
  windowId: string;
  title: string;
  tabCount: number;
  tabs: tabData[];
}

export interface tabFolderData {
  tabFolderId: string;
  title: string;
  date: string;
  windowCount: number;
  tabCount: number;
  windows: windowTabData[];
}
