import CelsiusIcon from '../../assets/icons/celsius-icon.svg';
import FeelsLikeIcon from '../../assets/icons/thermometer-icon.svg';
import MinTempIcon from '../../assets/icons/thermometer-minus-icon-light.svg';
import MaxTempIcon from '../../assets/icons/thermometer-plus-icon-light.svg';
import '../../sass/TodaysWeather.scss';

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
 * @returns {React.ReactElement} React element that renders a search input with a button.
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
            <div className="d-flex title">
                weather (
                <img
                    className="celsius-icon"
                    src={CelsiusIcon}
                    alt="celsius icon"
                    width="30px"
                    height="30px"
                />
                )
            </div>
            <div className="d-flex align-items justify-content temp-and-icon-container">
                <div className="d-flex align-items justify-content icon-wrapper">
                    <img
                        src={props.icon}
                        alt="weather icon"
                        width="200px"
                        height="200px"
                    />
                </div>
                <div className="d-flex align-items justify-content temperature-wrapper">
                    {props.temperature}&deg;
                </div>
            </div>
            <div className="d-flex info-container">
                <div className="left-container">
                    <div className="d-flex align-items feels-like-wrapper">
                        <img
                            src={FeelsLikeIcon}
                            alt="feels like icon"
                            width="24px"
                            height="24px"
                        />
                        <span>feels like:&nbsp;{props.feels_like}&deg;</span>
                    </div>
                    <div className="d-flex align-items min-temp-wrapper">
                        <img
                            src={MinTempIcon}
                            alt="min temp icon"
                            width="24px"
                            height="24px"
                        />
                        <span>min:&nbsp;{props.min_temperature}&deg;</span>
                    </div>
                    <div className="d-flex align-items max-temp-wrapper">
                        <img
                            src={MaxTempIcon}
                            alt="max temp icon"
                            width="24px"
                            height="24px"
                        />
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
