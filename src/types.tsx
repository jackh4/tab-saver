export interface TabData {
  id?: number;
  favIconUrl?: string;
  title: string;
  url: string;
  savedAt: string; // tab folder id 
}

export interface TabFolder {
  id: string;
  name: string;
  date: Date;
  tabs: TabData[];
}
