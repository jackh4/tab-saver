import { useRef } from 'react';
import './styles/RightHeader.css';

type RightHeaderProps = {
  searchText: string,
  setSearchText: (searchText: string) => void,
}

export default function RightHeader({
  searchText,
  setSearchText,
}: RightHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    inputRef.current?.focus();
  }

  return (
    <div className='right-header-container'>
      <div className='right-header-search-bar-wrapper'>
        <span 
          onClick={handleIconClick}
          className='right-header-search-icon material-symbols-outlined'>
          search
        </span>
        <input
          ref={inputRef}
          value={searchText}
          placeholder='Search by folder, window, and tab names'
          onChange={(e) => setSearchText(e.target.value)}
          className='right-header-search-input'
        />
      </div>
    </div>
  );
}
