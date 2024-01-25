import { useContext } from 'react';
import { SearchContext } from '../../App';
import SearchIcon from '../../assets/icons/search-icon.svg';
import './Search.css';

/**
 * This component renders a search engine.
 * @returns {React.ReactElement} React element that renders a search input with a button.
 */
const Search = () => {
    const { search, onSearchChange, onSearchButtonClick } = useContext(SearchContext);
    return (
        <div className="search-container">
            <input type="search" name="search" id="search" placeholder="Search..." value={search} onChange={onSearchChange}/>
            <button className='search-btn' onClick={onSearchButtonClick}>
                <img id="search-icon" className="search-icon" src={SearchIcon} alt="search-icon" width="30px" height="30px"/>
            </button>
        </div>
    );
};
export default Search;
