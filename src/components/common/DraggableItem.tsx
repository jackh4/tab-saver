import React from 'react';
import { useDragContext } from '../../contexts/DragContext';
import { tabData, windowTabData } from '../../types';

interface DraggableItemProps {
  item: tabData | windowTabData;
  children: React.ReactNode;
}

const DraggableItem = ({ 
  item, 
  children 
}: DraggableItemProps) => {
  const { setDragItem } = useDragContext();

  const handleDragStart = () => {
    setDragItem(item);
  };

  const handleDragEnd = () => {
    setDragItem(null);
  };

  return (
    <div draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {children}
    </div>
  );
};

export default DraggableItem;
