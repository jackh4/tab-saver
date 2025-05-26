import './styles/TabFolder.css';
import { tabFolderData, windowTabData } from '../../../types';
import { DragItem } from '../../../contexts/DragContext';
import { useTabFolderDispatch } from '../../../contexts/TabFolderContext';
import useCollapse from '../../../hooks/useCollapse';
import useEditTitle from '../../../hooks/useEditTitle';
import TabFolderDetails from './TabFolderDetails';
import DropZone from '../../common/DropZone';
import Icon from '../../common/Icon';

type TabFolderProps = {
  tabFolder: tabFolderData;
}

const TabFolder = ({
  tabFolder,
}: TabFolderProps) => {
  const dispatch = useTabFolderDispatch();

  const { isCollapsed, toggleCollapse } = useCollapse({ initialState: true });
  const { 
    title, 
    isEditing, 
    setIsEditing,
    handleTitleChange, 
    toggleIsEditing 
  } = useEditTitle({
    initialTitle: tabFolder.title,
    initialEditState: false,
  });

  const handleEditFolderTitle = (newTitle: string) => {
    dispatch({ 
      type: 'UPDATE_FOLDER_TITLE', 
      payload: { folderId: tabFolder.tabFolderId, newTitle: newTitle} 
    });
  };

  const handleDeleteFolder = () => {
    dispatch({
      type: 'DELETE_FOLDER',
      payload: { folderId: tabFolder.tabFolderId }
    });
  };

  const handleAddWindow = (window: windowTabData) => {
    dispatch({
      type: 'ADD_WINDOW_TO_FOLDER',
      payload: { folderId: tabFolder.tabFolderId, newWindow: window }
    });
  };

  const canDrop = (item: DragItem) => {
    return !!item && item.type === 'window';
  };
  
  const onDrop = (item: DragItem) => {
    if (item && item.type === 'window') {
      console.log(`Dropped window "${item.title}" (ID: ${item.windowId}) into folder "${tabFolder.tabFolderId}"`);
      handleAddWindow(item);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (tabFolder.title !== title) {
      handleEditFolderTitle(title);
    }
  };

  const handleKeyDownOnTitle = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
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

  /*
  Extra safety steps

  Validate urls before opening them

  Throttle the amount of tabs being opened at a time based on amount of tabs being opened
  */

  const handleOpenFolder = (windowTabs: windowTabData[]) => {
    windowTabs.map(window => {
      const urls = window.tabs.map(tab => tab.url);
      try {
        chrome.windows.create({ url: urls }, () => {
          if (chrome.runtime.lastError) {
            console.error(`Chrome API error opening ${urls}: `, chrome.runtime.lastError.message);
          }
        });
      } catch (err) {
        console.error(`Exception while opening ${urls}: `, err);
      }
    });
  };

  return (
    <div className='tab-folder-container'>
      <DropZone onDrop={onDrop} canDrop={canDrop}>
        <div className='tab-folder-metadata-header'>
          {!isEditing ? (
            <div className='tab-folder-title-container'>
              <div 
                onClick={handleTitleClick}
                className='tab-folder-title'
              >
                {title}
              </div>
              <div className='edit-title-button'>
                <Icon
                  materialIconName='edit'
                  tooltipText='Rename folder'
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleIsEditing();
                  }}
                />
              </div>
            </div>
          ) : (
            <input
              value={title}
              onBlur={handleBlur}
              onChange={handleTitleChange}
              onKeyDown={(e) => handleKeyDownOnTitle(e)}
              autoFocus
              className='tab-folder-title-edit'
            />
          )}
          <div className='tab-folder-date'>{getPrettyDate(tabFolder.date)}</div>

          <div className='tab-folder-action-container'>
            <Icon
              materialIconName={isCollapsed ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
              tooltipText={isCollapsed ? 'Expand' : 'Collapse'}
              onClick={(e) => {
                e.stopPropagation();
                toggleCollapse();
              }}
            />
            <Icon
              materialIconName='open_in_new'
              tooltipText='Open all in new window'
              onClick={(e) => {
                e.stopPropagation();
                handleOpenFolder(tabFolder.windows);
              }}
            />
            <Icon
              materialIconName='close'
              tooltipText='Delete tab folder'
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFolder();
              }}
              varHoverColor='--delete-icon-hover-color'
            />
          </div>
        </div>

        {!isCollapsed && (
          <>
            <div className='divider' />
            {tabFolder.windows.map((window) => (
              <TabFolderDetails 
                key={window.windowId} 
                tabFolderId={tabFolder.tabFolderId} 
                tabWindowData={window} 
              />
            ))}
          </>
        )}
      </DropZone>
    </div>
  );
};

export default TabFolder;
