import './index.css';
import { TabFolder } from '../../../types';
import TabItem from '../../tabItem';
import useSelectedTabs from '../../../hooks/useSelectedTabs';

type TabFolderProps = {
	folder: TabFolder;
};

const TabFolderItem = (tabFolder: TabFolderProps) => {
  const { selectedIds, toggleSelect } = useSelectedTabs();

  // TODO: enable delete specific tab

  return (
    <ul>
      {tabFolder.folder.tabs.map((tab) => (
        <TabItem
          key={tab.id}
          tab={tab}
          selected={selectedIds.includes(tab.id!)}
          toggleSelect={toggleSelect}
        />
      ))}
    </ul>
  );
};

export default TabFolderItem;
