import './styles/TabFolder.css';
import { tabFolderData, windowTabData } from '../../../types';
import { DragItem } from '../../../contexts/DragContext';
import { useSettingsContext } from '../../../contexts/SettingsContext';
import { useTabFolderDispatch } from '../../../contexts/TabFolderContext';
import useCollapse from '../../../hooks/useCollapse';
import useEditTitle from '../../../hooks/useEditTitle';
import { createLazyURL, getPrettyDate } from '../../../utils/functions';
import TabFolderDetails from './TabFolderDetails';
import DropZone from '../../common/DropZone';
import Icon from '../../common/Icon';

type TabFolderProps = {
  tabFolder: tabFolderData;
}

const TabFolder = ({
  tabFolder,
}: TabFolderProps) => {
  const settings = useSettingsContext();

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

  const handleOpenFolder = (windowTabs: windowTabData[]) => {
    windowTabs.forEach(window => {
      const urls = window.tabs.map(tab => {
        if (settings.lazyLoad) {
          return createLazyURL(tab.title, tab.favIcon, tab.url);
        } else {
          return tab.url;
        }
      });

      chrome.windows.create({ url: urls }, () => {
        if (chrome.runtime.lastError) {
          console.warn(`Chrome API error opening ${urls}: `, chrome.runtime.lastError.message);
        }
      });
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
