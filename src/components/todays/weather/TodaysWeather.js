import './TodaysWeather.css';

/**
 * @typedef {Object} Props
 * @property {string} icon
 * @property {number} temperature
 * @property {number} feels_like
 * @property {number} min_temperature
 * @property {number} max_temperature
 * @property {string} city_name
 * @property {string} description
 */
/**
 * This component renders a today's weather info.
 * @param {Props} props 
 * @returns 
 */
const TodaysWeather = (props) => {
    /**
     * Get the current day's with time (AM/PM).
     * @returns {string}
     */
    const getCurrentDayAndTime = () => {
        return new Date().toLocaleDateString('en', {
            weekday: 'long',
            hour: 'numeric',
            hour12: true,
        });
    };

    return (
        <div className="todays-weather-temp-container">
            <div className="title">weather</div>
            <div className="temp-and-icon-container">
                <div className="icon-wrapper">
                    <img src={props.icon} width="200px" height="200px" />
                </div>
                <div className="temperature-wrapper">
                    {props.temperature}&deg;
                </div>
            </div>
            <div className="info-container">
                <div className="left-container">
                    <div className="feels-like-wrapper">
                        <span>
                            <i className="fa-solid fa-temperature-half" />
                            <span>
                                feels like:&nbsp;{props.feels_like}&deg;
                            </span>
                        </span>
                    </div>
                    <div className="min-temp-wrapper">
                        <i className="fa-solid fa-temperature-low" />
                        <span>min:&nbsp;{props.min_temperature}&deg;</span>
                    </div>
                    <div className="max-temp-wrapper">
                        <i className="fa-solid fa-temperature-high" />
                        <span>max:&nbsp;{props.max_temperature}&deg;</span>
                    </div>
                </div>
                <div className="right-container">
                    <div className="city-name-wrapper">{props.city_name}</div>
                    <div className="day-time-wrapper">
                        {getCurrentDayAndTime()}
                    </div>
                    <div className="description-wrapper">
                        {props.description}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TodaysWeather;
