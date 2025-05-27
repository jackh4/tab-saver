import './styles/TabFolderDetails.css';
import { tabData, windowTabData } from '../../../types';
import { DragItem } from '../../../contexts/DragContext';
import { useTabFolderDispatch } from '../../../contexts/TabFolderContext';
import useCollapse from '../../../hooks/useCollapse';
import useEditTitle from '../../../hooks/useEditTitle';
import DropZone from '../../common/DropZone';
import Icon from '../../common/Icon';

type TabFolderDetailsProps = {
  tabFolderId: string;
  tabWindowData: windowTabData;
}

const TabFolderDetails = ({
  tabFolderId,
  tabWindowData,
}: TabFolderDetailsProps) => {
  const dispatch = useTabFolderDispatch();

  const { isCollapsed, toggleCollapse } = useCollapse({ initialState: false });
  const { 
    title, 
    isEditing, 
    setIsEditing,
    handleTitleChange, 
    toggleIsEditing 
  } = useEditTitle({
    initialTitle: tabWindowData.title,
    initialEditState: false,
  });

  const handleEditWindowTitle = (windowTitle: string) => {
    dispatch({ 
      type: 'UPDATE_WINDOW_TITLE', 
      payload: { folderId: tabFolderId, windowId: tabWindowData.windowId, newTitle: windowTitle } 
    });
  };

  const handleDeleteWindow = () => {
    dispatch({
      type: 'DELETE_WINDOW',
      payload: { folderId: tabFolderId, windowId: tabWindowData.windowId }
    });
  };

  const handleDeleteTab = (tabId: string) => {
    dispatch({
      type: 'DELETE_TAB_FROM_WINDOW',
      payload: { folderId: tabFolderId, windowId: tabWindowData.windowId, tabId: tabId }
    });
  };

  const handleAddTab = (tab: tabData) => {
    dispatch({
      type: 'ADD_TAB_TO_WINDOW',
      payload: { folderId: tabFolderId, windowId: tabWindowData.windowId, tab: tab }
    });
  };

  const canDrop = (item: DragItem) => {
    return !!item && item.type === 'tab';
  };

  const onDrop = (item: DragItem) => {
    if (item && item.type === 'tab') {
      console.log(`Dropped tab "${item.title}" (ID: ${item.tabId}) into window "${tabWindowData.windowId}"`);
      handleAddTab(item);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (tabWindowData.title !== title) {
      handleEditWindowTitle(title);
    }
  };

  const handleKeyDownOnTitle = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const handleTabClick = (url: string) => {
    try {
      chrome.tabs.create({ url: url }, () => {
        if (chrome.runtime.lastError) {
          console.error(`Chrome API error opening ${url}: `, chrome.runtime.lastError.message);
        }
      });
    } catch (err) {
      console.error(`Exception while opening ${url}: `, err);
    }
  };

  const handleWindowClick = (tabs: tabData[]) => {
    const urls = tabs.map(tab => tab.url);

    try {
      chrome.windows.create({ url: urls }, () => {
        if (chrome.runtime.lastError) {
          console.error(`Chrome API error opening ${urls}: `, chrome.runtime.lastError.message);
        }
      });
    } catch (err) {
      console.error(`Exception while opening ${urls}: `, err);
    }
  };

  return (
    <DropZone onDrop={onDrop} canDrop={canDrop}>
      <div className='tab-folder-details-container'>
        <div 
          title='Open window'
          onClick={() => handleWindowClick(tabWindowData.tabs)}
          className='tab-folder-details-header'
        >
          <Icon
            materialIconName={isCollapsed ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}
            tooltipText={isCollapsed ? 'Expand' : 'Collapse'}
            onClick={(e) => {
              e.stopPropagation();
              toggleCollapse();
            }}
          />

          {!isEditing ? (
            <div className='tab-folder-window-title-container'>
              <div className='tab-folder-window-title'>Window: {title}</div>
              <div className='window-action-buttons'>
                <Icon
                  materialIconName='edit'
                  tooltipText='Rename window'
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleIsEditing();
                  }}
                />
                <Icon
                  materialIconName='close'
                  tooltipText='Delete window'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteWindow();
                  }}
                  varHoverColor='--delete-icon-hover-color'
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
              className='tab-folder-window-title-edit'
            />
          )}
        </div>

        {!isCollapsed && (
          <ul className='tab-folder-window-list'>
            {tabWindowData.tabs.map(({ tabId, favIcon, title, url }, index) => (
              <li 
                key={index} 
                title='Open tab'
                onClick={() => handleTabClick(url)}
                className='tab-folder-window-list-item'
              >
                <div className='tab-folder-window-tab-data-container'>
                  <img className='tab-folder-window-list-item-icon' src={favIcon} alt=''/>
                  <div className='tab-folder-window-list-item-title'>{title}</div>
                </div>
                <div className='delete-tab-button'>
                  <Icon
                    materialIconName='close'
                    tooltipText='Delete tab'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTab(tabId);
                    }}
                    varHoverColor='--delete-icon-hover-color'
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DropZone>
  );
};

export default TabFolderDetails;
