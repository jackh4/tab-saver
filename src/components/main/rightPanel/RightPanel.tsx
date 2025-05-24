import './styles/RightPanel.css';
import RightHeader from './RightHeader';
import TabFolderList from './TabFolderList';
import { useTabFolderContext } from '../../../contexts/TabFolderContext';

export default function RightPanel() {
  const tabFolders = useTabFolderContext();

  return (
    <div className='right-panel'>
      <RightHeader/>
      <TabFolderList 
        tabFolders={tabFolders}
      />
    </div>
  );
}
