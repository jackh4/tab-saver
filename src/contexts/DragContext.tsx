import { createContext, useContext, useState, ReactNode } from 'react';
import { tabData, windowTabData } from '../types';

export type DragItem = 
  | tabData
  | windowTabData
  | null;

interface DragContextProps {
  dragItem: DragItem;
  setDragItem: (item: DragItem) => void;
}

const DragContext = createContext<DragContextProps | undefined>(undefined);

export const DragProvider = ({ children }: { children: ReactNode }) => {
  const [dragItem, setDragItem] = useState<DragItem>(null);

  return (
    <DragContext.Provider value={{ dragItem, setDragItem }}>
      {children}
    </DragContext.Provider>
  );
};

export const useDragContext = (): DragContextProps => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error('useDragContext must be used within a DragProvider');
  }
  return context;
};
