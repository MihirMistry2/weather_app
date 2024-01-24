import { createContext, useState } from 'react';
import Empty from './components/empty/Empty';
import './App.css';

const SearchContext = createContext();
const App = () => {
    /**
     * @typedef {Object} weatherDetails
     * @property {string} city_name
     * @property {number} temperature
     * @property {number} min_temperature
     * @property {number} max_temperature
     * @property {number} feels_like
     * @property {number} humidity
     * @property {number} pressure
     * @property {number} wind
     * @property {string} description
     * @property {string} sunrise
     * @property {string} sunset
     * @property {string} icon
     */

    /** @type {[search: string, setSearch: Function]}  */
    const [search, setSearch] = useState('');
    /** @type {[weatherDetails: (weatherDetails|null), setWeatherDetails: Function]} */
    const [weatherDetails, setWeatherDetails] = useState(null);

    /**
     * Function that sets the search value on search input change.
     * @param {Event} e
     */
    const onSearchChange = (e) => {
        const value = e.target.value;
        const $input = document.getElementById('search');
        $input.classList.remove('error');
        setSearch(value);
    };

    return (
        <div className="main-container d-flex align-items justify-content">
            {weatherDetails ? (
                <>App</>
            ) : (
                <SearchContext.Provider value={{ search, onSearchChange }}>
                    <Empty />
                </SearchContext.Provider>
            )}
        </div>
    );
};
export default App;
export { SearchContext };