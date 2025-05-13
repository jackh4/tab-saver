import './index.css';
import SavedTabFolders from '../TabFolders';
import TabList from '../tabList';

const Layout = () => (
  <div className='flex-container'>
    <div className='left-tab-list-main'>
      <TabList/>
    </div>
    <div className='right-tab-folders-main'>
      <SavedTabFolders/>
    </div>
  </div>
);

export default Layout;
