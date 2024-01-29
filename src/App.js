import { createContext, useEffect, useRef, useState } from 'react';
import Empty from './components/empty/Empty';
import Search from './components/search/Search';
import TodaysWeather from './components/todays/weather/TodaysWeather';
import TodaysForecast from './components/todays/forecast/TodaysForecast';
import AirInfo from './components/air_info/AirInfo';
import FiveDaysForecast from './components/five_days_forecast/FiveDaysForecast';
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
     * @typedef {Object} TodaysForecast
     * @property {string} time
     * @property {string} temp
     * @property {string} icon
     */
    /**
     * @typedef {Object} FormatedDate
     * @property {WeatherDetails} weather_details
     * @property {TodaysForecast[]} todays_details
     */

    const api = {
        key: process.env.REACT_APP_OPENWEATHERMAP_KEY,
        base_url: process.env.REACT_APP_OPENWEATHERMAP_BASE,
    };
    /** @type {[weatherDetails: (WeatherDetails|null), setWeatherDetails: Function]} */
    const [weatherDetails, setWeatherDetails] = useState(null);
    /** @type {[todaysForecast: (TodaysForecast[]|[]), setTodaysForecast: Function]} */
    const [todaysForecast, setTodaysForecast] = useState([]);
    const ref = useRef();

    /**
     * Formatting JSON response data.
     * @param {*} data
     * @returns {FormatedDate}
     */
    const getFormattedJSON = (data) => {
        const dateConfig = {
            hour: 'numeric',
            hour12: true,
        };
        const getWeatherDetails = () => {
            let weatherDetailsObj = {};
            try {
                const main = data.list[0].main;
                const wind = data.list[0].wind;
                const weather = data.list[0].weather[0];
                weatherDetailsObj = {
                    city_name: data.city.name,
                    temperature: Math.round(main.temp),
                    min_temperature: Math.round(main.temp_min),
                    max_temperature: Math.round(main.temp_max),
                    feels_like: Math.round(main.feels_like),
                    humidity: main.humidity,
                    pressure: main.pressure,
                    wind: Math.round(wind.speed * 3.6),
                    description: weather.description,
                    icon: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                    sunrise: new Date(data.city.sunrise * 1000).toLocaleString('en', dateConfig),
                    sunset: new Date(data.city.sunset * 1000).toLocaleString('en', dateConfig),
                };
            } catch (error) {
                console.error(error.message);
            }
            return weatherDetailsObj;
        };
        const getTodaysDetails = () => {
            const todaysDetailsObj = [];
            try {
                for (const obj of data.list) {
                    const currentDate = new Date().toLocaleDateString();
                    const dataDate = new Date(obj.dt_txt).toLocaleDateString();
                    let hours = '9 AM';
                    if (dataDate === currentDate) {
                        const time = new Date(obj.dt_txt).toLocaleString('en', dateConfig);
                        const temp = Math.round(obj.main.temp);
                        const icon = `http://openweathermap.org/img/wn/${obj.weather[0].icon}@4x.png`;
                        todaysDetailsObj.push({ time, temp, icon });
                    }
                }
            } catch (error) {
                console.error(error.message);
            }
            return todaysDetailsObj;
        };

        return {
            weather_details: getWeatherDetails(),
            todays_details: getTodaysDetails(),
        };
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
                        const { weather_details, todays_details } = getFormattedJSON(result);
                        setWeatherDetails(weather_details);
                        setTodaysForecast(todays_details.splice(0, 3));
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
        <div className="main-wrapper d-flex align-items justify-content">
            <div className="main-container d-flex align-items justify-content">
                <FetchFunctionContext.Provider value={{ fetchWeatherDetails, fetchForecastDetails }}>
                    {weatherDetails ? (
                        <>
                            <div className="current-weather-info-container">
                                <Search ref={ref} />
                                <TodaysWeather
                                    icon={weatherDetails.icon}
                                    temperature={weatherDetails.temperature}
                                    feels_like={weatherDetails.feels_like}
                                    min_temperature={weatherDetails.min_temperature}
                                    max_temperature={weatherDetails.max_temperature}
                                    city_name={weatherDetails.city_name}
                                    description={weatherDetails.description}
                                />
                                <TodaysForecast todaysForecast={todaysForecast} />
                            </div>
                            <div className="forecast-and-air-container">
                                <FiveDaysForecast />
                                <AirInfo
                                    wind={weatherDetails.wind}
                                    humidity={weatherDetails.humidity}
                                    pressure={weatherDetails.pressure}
                                    sunrise={weatherDetails.sunrise}
                                    sunset={weatherDetails.sunset}
                                />
                            </div>
                        </>
                    ) : (
                        <Empty forwardedRef={ref} />
                    )}
                </FetchFunctionContext.Provider>
            </div>
        </div>
    );
};
export default App;
export { FetchFunctionContext };
