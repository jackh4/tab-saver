import './styles/TabFolderList.css';
import { tabFolderData } from '../../../types';
import TabFolder from './TabFolder';

type TabFolderListProps = {
  tabFolders: tabFolderData[];
}

const TabFolderList = ({ 
  tabFolders,
}: TabFolderListProps) => {
  // Edit folder details (title)

  // Open all tabs in folder

  // Delete folder

  return (
    <div className='tab-folder-list-container'>
      {tabFolders.length === 0 ? (
        <p>No tab folder saved</p>
      ) : (
        tabFolders.map((tabFolder) => (
          <TabFolder
            key={tabFolder.tabFolderId}
            tabFolder={tabFolder}
          />
        ))
      )}
    </div>
  );
};

export default TabFolderList;
