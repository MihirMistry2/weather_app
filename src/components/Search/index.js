import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { FetchFunctionContext } from '../../App';
import SearchIcon from '../../assets/icons/search-icon.svg';
import LoaderIcon from '../../assets/icons/loader-icon.svg';
import SeachIcon from '../../assets/icons/search-icon.svg';
import '../../sass/Search.scss';

/**
 * This component renders a search engine.
 * @returns {React.ReactElement} React element that renders a search input with a button.
 */
const Search = (props, ref) => {
    /** @type {[search: string, setSearch: Function]}  */
    const [search, setSearch] = useState('');
    const { fetchWeatherDetails } = useContext(FetchFunctionContext);

    /**
     * Return searhc value for.
     * @returns {string}
     */
    const getSearchValue = () => {
        return search;
    };
    /**
     * Validate the search input field.
     * @returns {boolean}
     */
    const validateSearchInput = () => {
        if (search === '') {
            const $input = document.getElementById('search');
            $input.classList.add('error');
            return false;
        }
        return true;
    };
    /**
     * Change the icon of the search button according to the given state.
     * @param {string} state - (loader|default)
     */
    const updateSearchButtonIconState = (state) => {
        const $icon = document.querySelector('.main-container .search-icon');
        const $btn = document.querySelector('.main-container .search-btn');
        switch (state) {
            case 'loader':
                $icon.src = LoaderIcon;
                $icon.classList.add('rotate');
                $btn.classList.add('not-allow');
                break;
            default:
                $icon.src = SeachIcon;
                $icon.classList.remove('rotate');
                $btn.classList.remove('not-allow');
                break;
        }
    };
    /**
     * Sets the search value on search input change.
     * @param {Event} e
     */
    const onSearchChange = (e) => {
        const value = e.target.value;
        const $input = document.querySelector(
            '.main-container .search-container #search'
        );
        $input.classList.remove('error');
        setSearch(value);
    };
    /**
     * Creates an API URL that is based on the city name and adds a loading icon to the button.
     * @param {Event} e
     */
    const onSearchButtonClick = (e) => {
        if (validateSearchInput()) {
            const root = process.env.REACT_APP_OPENWEATHERMAP_BASE;
            const key = process.env.REACT_APP_OPENWEATHERMAP_KEY;
            const url = `${root}?q=${search}&appid=${key}&units=metric&cnt=1`;
            updateSearchButtonIconState('loader');
            fetchWeatherDetails(url, true);
        }
    };

    useImperativeHandle(
        ref,
        () => {
            return { getSearchValue, updateSearchButtonIconState };
        },
        []
    );

    return (
        <div className="search-container">
            <input
                type="search"
                name="search"
                id="search"
                placeholder="Search..."
                value={search}
                onChange={onSearchChange}
            />
            <button className="search-btn" onClick={onSearchButtonClick}>
                <img
                    id="search-icon"
                    className="search-icon"
                    src={SearchIcon}
                    alt="search icon"
                    width="30px"
                    height="30px"
                />
            </button>
        </div>
    );
};
export default forwardRef(Search);
