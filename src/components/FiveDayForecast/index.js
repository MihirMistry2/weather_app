import MinTempIcon from '../../assets/icons/thermometer-minus-icon-dark.svg';
import MaxTempIcon from '../../assets/icons/thermometer-plus-icon-dark.svg';
import '../../sass/FiveDayForecast.scss';

/**
 * @typedef {Object} Props
 * @property {FiveDayForecast} day_name
 */
/**
 * @typedef {Object} FiveDayForecast
 * @property {string} day
 * @property {string} description
 * @property {string} icon
 * @property {number} max
 * @property {number} min
 */
/**
 * This component renders a five days forecast.
 * @param {Props} props
 * @returns {React.ReactElement} React element that renders a search input with a button.
 */
const FiveDayForecast = ({ fiveDayForecast }) => {
    return (
        <div className="five-day-forecast-container">
            <div className="title">5-day&nbsp;forecast</div>
            <div className="forecast-container">
                {Object.entries(fiveDayForecast).map(([key, value], i) => (
                    <div className="info" key={i} id={i}>
                        <div className="day">
                            <span>{value.day}</span>
                        </div>
                        <div className="icon">
                            <img
                                src={value.icon}
                                width="60px"
                                alt="weather icon"
                                height="60px"
                            />
                        </div>
                        <div className="description">{value.description}</div>
                        <div className="temp">
                            <div className="temp-wrapper d-flex">
                                <span className="max d-flex align-items">
                                    <img
                                        src={MaxTempIcon}
                                        alt="min itemp icon"
                                        width="24px"
                                        height="24px"
                                    />
                                    &nbsp;
                                    {value.max}
                                </span>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <span className="min d-flex align-items">
                                    <img
                                        src={MinTempIcon}
                                        alt="max temp icon"
                                        width="24px"
                                        height="24px"
                                    />
                                    &nbsp;
                                    {value.min}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default FiveDayForecast;
