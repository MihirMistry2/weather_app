import { createContext, useState } from 'react';
import Empty from './components/empty/Empty';
import LoaderIcon from './assets/icons/loader-icon.svg';
import SeachIcon from './assets/icons/search-icon.svg';
import './App.css';

const SearchContext = createContext();
const App = () => {
    /**
     * @typedef {Object} WeatherDetails
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
    /**
     * @typedef {Object} FormatedDate
     * @property {WeatherDetails} weather_details
     */

    const api = {
        key: 'c7ea2254941a00f9285ac2800a650363',
        base_url: 'https://api.openweathermap.org/data/2.5/forecast',
    };
    /** @type {[search: string, setSearch: Function]}  */
    const [search, setSearch] = useState('');
    /** @type {[weatherDetails: (WeatherDetails|null), setWeatherDetails: Function]} */
    const [weatherDetails, setWeatherDetails] = useState(null);

    /**
     * Formatting JSON response data.
     * @param {*} data
     * @returns {FormatedDate}
     */
    const getFormattedJSON = (data) => {
        const result = {
            weather_details: {},
        };
        const main = data.list[0].main;
        const wind = data.list[0].wind;
        const weather = data.list[0].weather[0];
        result.weather_details.city_name = data.city.name;
        result.weather_details.temperature = Math.round(main.temp);
        result.weather_details.min_temperature = Math.round(main.temp_min);
        result.weather_details.max_temperature = Math.round(main.temp_max);
        result.weather_details.feels_like = Math.round(main.feels_like);
        result.weather_details.humidity = main.humidity;
        result.weather_details.pressure = main.pressure;
        result.weather_details.wind = Math.round(wind.speed * 3.6);
        result.weather_details.description = weather.description;
        result.weather_details.sunrise = new Date(
            data.city.sunrise * 1000
        ).toLocaleString('en', {
            hour: 'numeric',
            hour12: true,
        });
        result.weather_details.sunset = new Date(
            data.city.sunset * 1000
        ).toLocaleString('en', {
            hour: 'numeric',
            hour12: true,
        });
        result.weather_details.icon = `http://openweathermap.org/img/wn/${weather.icon}@4x.png`;
        return result;
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
     * Fetch weather information by city name using the OpenWeatherMap API and generate a new URL with latitude and longitude to obtain forecast details.
     * @param {string} url - API URL that contains city name.
     */
    const fetchWeatherDetails = (url) => {
        fetch(url)
            .then((resp) => resp.json())
            .then((result) => {
                if (result.cod && Number(result.cod) === 200) {
                    const latitude = result.city.coord.lat;
                    const longitude = result.city.coord.lon;
                    const url = `${api.base_url}?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`;
                    fetchForecastDetails(url);
                    return;
                }
                setWeatherDetails(null);
            })
            .catch((error) => {
                updateSearchButtonIconState();
                alert(error.message);
                setWeatherDetails(null);
            });
    };
    /**
     * Fetch weather forecast by latitude and longitude using the OpenWeatherMap API and set the weather details value.
     * @param {*} url - API URL that contains latitude and longitude.
     */
    const fetchForecastDetails = (url) => {
        fetch(url)
            .then((resp) => resp.json())
            .then((result) => {
                if (result.cod && Number(result.cod) === 200) {
                    const { weather_details } = getFormattedJSON(result);
                    setWeatherDetails(weather_details);
                    return;
                }
                setWeatherDetails(null);
            })
            .catch((error) => {
                alert(error.message);
                updateSearchButtonIconState();
                setWeatherDetails(null);
            });
    };
    /**
     * Change the icon of the search button according to the given state.
     * @param {string} state - (loader|default)
     */
    const updateSearchButtonIconState = (state) => {
        const $icon = document.getElementById('search-icon');
        switch (state) {
            case 'loader':
                $icon.src = LoaderIcon;
                $icon.classList.add('rotate');
                break;
            default:
                $icon.src = SeachIcon;
                $icon.classList.remove('rotate');
                break;
        }
    };
    /**
     * Sets the search value on search input change.
     * @param {Event} e
     */
    const onSearchChange = (e) => {
        const value = e.target.value;
        const $input = document.getElementById('search');
        $input.classList.remove('error');
        setSearch(value);
    };
    /**
     * Creates an API URL that is based on the city name and adds a loading icon to the button.
     * @param {Event} e
     */
    const onSearchButtonClick = (e) => {
        if (validateSearchInput()) {
            const url = `${api.base_url}?q=${search}&appid=${api.key}&units=metric&cnt=1`;
            updateSearchButtonIconState('loader');
            fetchWeatherDetails(url, true);
        }
    };

    return (
        <div className="main-container d-flex align-items justify-content">
            {weatherDetails ? (
                <>App</>
            ) : (
                <SearchContext.Provider value={{ search, onSearchChange, onSearchButtonClick }}>
                    <Empty />
                </SearchContext.Provider>
            )}
        </div>
    );
};
export default App;
export { SearchContext };
