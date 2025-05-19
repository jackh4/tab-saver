import './App.css';
import LeftPanel from './components/main/leftPanel/LeftPanel';
import RightPanel from './components/main/rightPanel/RightPanel';

function App() {

  return (
    <div className='app-container light'>
      <div className='left-panel-container'>
        <LeftPanel/>
      </div>
      <div className='right-panel-container'>
        <RightPanel/>
      </div>
    </div>
  );
}

export default App;
