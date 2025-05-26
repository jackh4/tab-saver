import { useState, ReactNode, DragEvent, useRef } from 'react';
import './styles/DropZone.css';
import { DragItem, useDragContext } from '../../contexts/DragContext';

interface DropZoneProps {
  onDrop: (item: DragItem) => void;
  canDrop: (type: DragItem) => boolean;
  children: ReactNode;
}

const DropZone = ({ 
  onDrop, 
  canDrop, 
  children 
}: DropZoneProps) => {
  const { dragItem, setDragItem } = useDragContext();
  const [isValidDrop, setIsValidDrop] = useState<boolean>(false);
  // dragging cursor with drag item caused flickering in the dropzone highlight
  // due to dragenter and dragleave being called multiple times when moving 
  // between child elements of the same drop zone.
  // use counter to balance dragenter and dragleave events to keep hightlight
  const dragCounter = useRef(0);

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    if (canDrop(dragItem)) {
      setIsValidDrop(true);
    }
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsValidDrop(false);
    }
  };

  const handleDrop = () => {
    dragCounter.current = 0;
    if (dragItem) {
      onDrop(dragItem);
      setDragItem(null);
    }
    setIsValidDrop(false);
  };

  return (
    <div 
      onDragEnter={handleDragEnter}
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
