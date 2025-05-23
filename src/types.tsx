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
  tabs: tabData[];
}

export interface tabFolderData {
  tabFolderId: string;
  title: string;
  date: string;
  windows: windowTabData[];
}
