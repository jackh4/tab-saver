import './styles/RightPanel.css';
import RightHeader from './RightHeader';
import TabFolderList from './TabFolderList';
import useTabFolders from '../../../hooks/useTabFolders';

export default function RightPanel() {
  const { tabFolders } = useTabFolders();

  return (
    <div className='right-panel'>
      <RightHeader/>
      <TabFolderList 
        tabFolders={tabFolders}
      />
    </div>
  );
}
