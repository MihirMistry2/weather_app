import { createContext, useEffect, useRef, useState } from 'react';
import Empty from './components/empty/Empty';
import './App.css';

const FetchFunctionContext = createContext();
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
        key: process.env.REACT_APP_OPENWEATHERMAP_KEY,
        base_url: process.env.REACT_APP_OPENWEATHERMAP_BASE,
    };
    /** @type {[weatherDetails: (WeatherDetails|null), setWeatherDetails: Function]} */
    const [weatherDetails, setWeatherDetails] = useState(null);
    const ref = useRef();

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
     * Fetch weather information by city name using the OpenWeatherMap API and generate a new URL with latitude and longitude to obtain forecast details.
     * @param {string} url - API URL that contains city name.
     */
    const fetchWeatherDetails = (url) => {
        fetch(url)
            .then((resp) => resp.json())
            .then((result) => {
                try {
                    if (result.cod && Number(result.cod) >= 200 && Number(result.cod) < 300) {
                        const latitude = result.city.coord.lat;
                        const longitude = result.city.coord.lon;
                        const url = `${api.base_url}?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`;
                        fetchForecastDetails(url);
                    } else {
                        alert(`Code: ${result.cod}\nMessage: ${result.message}`);
                        setWeatherDetails(null);
                    }
                    ref.current?.updateSearchButtonIconState();
                } catch (error) {
                    throw error;
                }
            })
            .catch((error) => {
                ref.current?.updateSearchButtonIconState();
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
                try {
                    if (result.cod && Number(result.cod) >= 200 && Number(result.cod) < 300) {
                        const { weather_details } = getFormattedJSON(result);
                        setWeatherDetails(weather_details);
                    } else {
                        alert(`Code: ${result.cod}\nMessage: ${result.message}`);
                        ref.current?.updateSearchButtonIconState();
                        setWeatherDetails(null);
                    }
                } catch (error) {
                    throw error;
                }
            })
            .catch((error) => {
                alert(error.message);
                ref.current?.updateSearchButtonIconState();
                setWeatherDetails(null);
            });
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            const url = `${api.base_url}?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`;
            fetchForecastDetails(url);
        });
    }, []);

    return (
        <div className="main-container d-flex align-items justify-content">
            <FetchFunctionContext.Provider value={{ fetchWeatherDetails, fetchForecastDetails }}>
                {weatherDetails ? <>App</> : <Empty forwardedRef={ref} />}
            </FetchFunctionContext.Provider>
        </div>
    );
};
export default App;
export { FetchFunctionContext };
