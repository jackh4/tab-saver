import { useState } from 'react';
import { DragItem, useDragContext } from '../../contexts/DragContext';

interface DropZoneProps {
  onDrop: (item: DragItem) => void;
  canDrop: (type: DragItem) => boolean;
  children: React.ReactNode;
}

const DropZone = ({ 
  onDrop, 
  canDrop, 
  children 
}: DropZoneProps) => {
  const { dragItem, setDragItem } = useDragContext();
  const [ isValidDrop, setIsValidDrop] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsValidDrop(canDrop(dragItem));
  };

  const handleDragLeave = () => {
    setIsValidDrop(false);
  };

  const handleDrop = () => {
    if (dragItem) {
      onDrop(dragItem);
      setDragItem(null);
    }
  };

  return (
    <div 
      onDragOver={handleDragOver} 
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={isValidDrop ? 'dropzone-active' : ''}
    >
      {children}
    </div>
  );
};

export default DropZone;
