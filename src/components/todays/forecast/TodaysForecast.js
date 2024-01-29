import './TodaysForecast.css';

/**
 * @typedef {Object} TodaysForecast
 * @property {string} time
 * @property {string} temp
 * @property {string} icon
 */
/**
 * @typedef {Object} Props
 * @property {TodaysForecast} todaysForecast
 */
/**
 * This component displays today's forecast in 3-hour intervals.
 * @param {Props} props
 * @returns {React.ReactElement} React element that renders a search input with a button.
 */
const TodaysForecast = ({ todaysForecast }) => {
    return (
        <div className="todays-forecast-container">
            <div className="title">Today's&nbsp;forecast</div>
            <div className="forecast-container">
                {todaysForecast.map((obj, i) => (
                    <div className="info" key={i} id={i}>
                        <div className="time-wrapper">{obj.time}</div>
                        <div className="icon-wrapper"><img src={obj.icon} alt='weather-icon' width="86px" height="86px" /></div>
                        <div className="temp-wrapper">{obj.temp}&deg;</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default TodaysForecast;
