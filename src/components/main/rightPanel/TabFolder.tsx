import { useState } from 'react';
import './styles/TabFolder.css';
import { tabFolderData, windowTabData } from '../../../types';
import { DragItem } from '../../../contexts/DragContext';
import { useTabFolderDispatch } from '../../../contexts/TabFolderContext';
import TabFolderDetails from './TabFolderDetails';
import DropZone from '../../common/DropZone';

type TabFolderProps = {
  tabFolder: tabFolderData;
}

const TabFolder = ({
  tabFolder,
}: TabFolderProps) => {
  const tabFolderId = tabFolder.tabFolderId;
  const dispatch = useTabFolderDispatch();

  const [folderTitle, setFolderTitle] = useState(tabFolder.title);
  const [isEditing, setIsEditing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => setIsCollapsed(prev => !prev); 

  /*
  OPEN LOGIC:
  - Open all tab folder
  */

  const handleEditFolderTitle = (newTitle: string) => {
    dispatch({ 
      type: 'UPDATE_FOLDER_TITLE', 
      payload: { folderId: tabFolderId, newTitle: newTitle} 
    });
  };

  const handleDeleteFolder = () => {
    dispatch({
      type: 'DELETE_FOLDER',
      payload: { folderId: tabFolderId }
    });
  };

  const handleAddWindow = (window: windowTabData) => {
    dispatch({
      type: 'ADD_WINDOW_TO_FOLDER',
      payload: { folderId: tabFolderId, newWindow: window }
    });
  };

  const canDrop = (item: DragItem) => {
    return !!item && item.type === 'window';
  };
  
  const onDrop = (item: DragItem) => {
    if (item && item.type === 'window') {
      console.log(`Dropped window "${item.title}" (ID: ${item.windowId}) into folder "${tabFolderId}"`);
      handleAddWindow(item);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (tabFolder.title !== folderTitle) {
      handleEditFolderTitle(folderTitle);
    }
  };

  const handleKeyDownOnTitle = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderTitle(e.target.value);
  };

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const getPrettyDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <DropZone onDrop={onDrop} canDrop={canDrop}>
      <div className='tab-folder-container'>
        <div className='tab-folder-metadata-header'>
          {!isEditing ? (
            <div 
              onClick={handleTitleClick}
              className='tab-folder-title'
            >
              {tabFolder.title}
            </div>
          ) : (
            <input
              value={folderTitle}
              onBlur={handleBlur}
              onChange={handleTitleChange}
              onKeyDown={(e) => handleKeyDownOnTitle(e)}
              autoFocus
              className='tab-folder-title-edit'
            />
          )}
          <div className='tab-folder-date'>{getPrettyDate(tabFolder.date)}</div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleCollapse();
            }}
            className='tab-folder-dropdown-icon'
          >
            <span className='material-symbols-outlined'>
              {isCollapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}
            </span>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteFolder();
            }}
            className='tab-folder-delete-icon'
          >
            <span className='material-symbols-outlined'>
              close
            </span>
          </div>
        </div>

        {!isCollapsed && tabFolder.windows.map((window) => (
          <TabFolderDetails key={window.windowId} tabFolderId={tabFolderId} tabWindowData={window}/>
        ))}
      </div>
    </DropZone>
  );
};

export default TabFolder;
