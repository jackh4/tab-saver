import { useState } from 'react';
import './styles/RightHeader.css';

export default function RightHeader() {
  const [searchText, setSearchText] = useState('');
  
  return (
    <div className='right-header-container'>
      <input
        value={searchText}
        placeholder='Search by folder title'
        onChange={(e) => setSearchText(e.target.value)}
        className='right-header-search-input'
      >
      </input>
    </div>
  );
}
