import SearchIcon from '../../assets/icons/search-icon.svg';
import './Search.css';

const Search = () => {
    return (
        <div className="search-container">
            <input
                type="search"
                name="search"
                id="search"
                placeholder="Search..."
            />
            <button>
                <img
                    id="search-icon"
                    className="search-icon"
                    src={SearchIcon}
                    alt="search-icon"
                    width="30px"
                    height="30px"
                />
            </button>
        </div>
    );
};
export default Search;
