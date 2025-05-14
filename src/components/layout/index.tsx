import './index.css';
import CurrentTabsPanel from '../currentTabsPanel';
import SavedTabFolders from '../tabFolders';

const Layout = () => (
  <div className='flex-container'>
    <div className='left-tab-list-main'>
      <CurrentTabsPanel/>
    </div>
    <div className='right-tab-folders-main'>
      <SavedTabFolders/>
    </div>
  </div>
);

export default Layout;
