export interface tabData {
  tabId: string;
  favIcon: string;
  title: string;
  url: string;
}

export interface windowTabData {
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
