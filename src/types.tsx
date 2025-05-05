export interface SavedTab {
  title: string;
  icon?: string;
  url: string;
  savedAt: string;
}

export interface TabSession {
  name: string;
  date: string;
  tabs: SavedTab[];
}