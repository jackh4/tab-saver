import { 
  createContext, 
  useContext, 
  useReducer, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';
import { tabData, tabFolderData, windowTabData } from '../types';

type TabFolderContextType = {
  tabFolders: tabFolderData[];
};

type TabFolderDispatchContextType = {
  dispatch: (action: TabFolderAction) => void;
};

const TabFolderContext = createContext<TabFolderContextType | undefined>(undefined);
const TabFolderDispatchContext = createContext<TabFolderDispatchContextType | undefined>(undefined);

type TabFolderAction =
  | { type: 'SET_ALL'; payload: tabFolderData[] }
  | { type: 'ADD_FOLDER'; payload: tabFolderData }
  | { type: 'DELETE_FOLDER'; payload: { folderId: string } }
  | { type: 'UPDATE_FOLDER_TITLE'; payload: { folderId: string; newTitle: string } }
  | { type: 'ADD_WINDOW_TO_FOLDER'; payload: { folderId: string; newWindow: windowTabData } }
  | { type: 'DELETE_WINDOW'; payload: { folderId: string; windowId: string } }
  | { type: 'UPDATE_WINDOW_TITLE'; payload: { folderId: string; windowId: string; newTitle: string } }
  | { type: 'ADD_TAB_TO_WINDOW'; payload: { folderId: string; windowId: string; tab: tabData } }
  | { type: 'DELETE_TAB_FROM_WINDOW'; payload: { folderId: string; windowId: string; tabId: string } };

const tabFolderReducer = (state: tabFolderData[], action: TabFolderAction): tabFolderData[] => {
  switch (action.type) {
  case 'SET_ALL': {
    return action.payload;
  }
  case 'ADD_FOLDER': {
    return [...state, action.payload];
  }
  case 'DELETE_FOLDER': {
    return state.filter(folder => folder.tabFolderId !== action.payload.folderId);
  }
  case 'UPDATE_FOLDER_TITLE': {
    return state.map(folder =>
      folder.tabFolderId === action.payload.folderId
        ? { ...folder, title: action.payload.newTitle }
        : folder
    );
  }
  case 'ADD_WINDOW_TO_FOLDER': {
    return state.map(folder =>
      folder.tabFolderId === action.payload.folderId
        ? { ...folder, windows: [...folder.windows, action.payload.newWindow] }
        : folder
    );
  }
  case 'DELETE_WINDOW': {
    return state.map(folder =>
      folder.tabFolderId === action.payload.folderId
        ? {
          ...folder,
          windows: folder.windows.filter(w => w.windowId !== action.payload.windowId),
        }
        : folder
    );
  }
  case 'UPDATE_WINDOW_TITLE': {
    return state.map(folder =>
      folder.tabFolderId === action.payload.folderId
        ? {
          ...folder,
          windows: folder.windows.map(w =>
            w.windowId === action.payload.windowId ? { ...w, title: action.payload.newTitle } : w
          ),
        }
        : folder
    );
  }
  case 'ADD_TAB_TO_WINDOW': {
    return state.map(folder =>
      folder.tabFolderId === action.payload.folderId
        ? {
          ...folder,
          windows: folder.windows.map(w =>
            w.windowId === action.payload.windowId
              ? { ...w, tabs: [...w.tabs, action.payload.tab] }
              : w
          ),
        }
        : folder
    );
  }
  case 'DELETE_TAB_FROM_WINDOW': {
    return state.map(folder =>
      folder.tabFolderId === action.payload.folderId
        ? {
          ...folder,
          windows: folder.windows.map(w =>
            w.windowId === action.payload.windowId
              ? {
                ...w,
                tabs: w.tabs.filter(tab => tab.tabId !== action.payload.tabId),
              }
              : w
          ),
        }
        : folder
    );
  }
  default: {
    return state;
  }
  }
};

export const TabFolderProvider = ({ children }: { children: ReactNode }) => {
  const [tabFolders, rawDispatch] = useReducer(tabFolderReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['tabFolders'], (result) => {
      const loaded: tabFolderData[] = Array.isArray(result.tabFolders)
        ? result.tabFolders
        : [];
      rawDispatch({ type: 'SET_ALL', payload: loaded });
      setIsLoaded(true);
    });
  }, []);

  const dispatch = (action: TabFolderAction) => {
    const newState = tabFolderReducer(tabFolders, action);
    chrome.storage.local.set({ tabFolders: newState });
    rawDispatch(action);
  };

  if (!isLoaded) return null; 

  return (
    <TabFolderContext.Provider value={{ tabFolders }}>
      <TabFolderDispatchContext value={{ dispatch }}>
        {children}
      </TabFolderDispatchContext>
    </TabFolderContext.Provider>
  );
};

export const useTabFolderContext = () => {
  const context = useContext(TabFolderContext);
  if (!context) {
    throw new Error('useTabFolderContext must be used within a TabFolderProvider');
  }
  return context.tabFolders;
};

export const useTabFolderDispatch = () => {
  const context = useContext(TabFolderDispatchContext);
  if (!context) {
    throw new Error('useTabFolderDispatch must be used within a TabFolderProvider');
  }
  return context.dispatch;
};
