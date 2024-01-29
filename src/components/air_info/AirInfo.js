import WindIcon from '../../assets/icons/wind-icon.svg';
import HumidityIcon from '../../assets/icons/humidity-icon.svg';
import PressureIcon from '../../assets/icons/speed-up-icon.svg';
import SunsetIcon from '../../assets/icons/sunset-icon.svg';
import SunriseIcon from '../../assets/icons/sunrise-icon.svg';
import './AirInfo.css';

/**
 * @typedef {Object} Props
 * @property {number} wind
 * @property {number} humidity
 * @property {number} pressure
 * @property {string} sunrise
 * @property {string} sunset
 */
/**
 * This component renders a Air info.
 * @param {Props} props
 * @returns {React.ReactElement} React element that renders a search input with a button.
 */
const AirInfo = (props) => {
    return (
        <div className="air-info-container">
            <div className="title">air conditions</div>
            <div className="info-container">
                <div className="top-container">
                    <div className="wind-speed-container">
                        <div className="title d-flex">
                            <img className="icon" src={WindIcon} alt="wind icon" width="24px" height="24px"/>
                            wind
                        </div>
                        <div className="wrapper">{props.wind}&nbsp;km/h</div>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="humidity-container">
                        <div className="title d-flex">
                            <img className="icon" src={HumidityIcon} alt="humidity icon" width="24px" height="24px"/>
                            humidity
                        </div>
                        <div className="wrapper">{props.humidity}%</div>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="pressure-container">
                        <div className="title d-flex">
                            <img className="icon" src={PressureIcon} alt="pressure icon" width="24px" height="24px"/>
                            pressure
                        </div>
                        <div className="wrapper">{props.pressure}&nbsp;hPa</div>
                    </div>
                </div>
                <div className="middle-container">
                    <div className="wrapper"><div className="horizontal-line"></div></div>
                    <div className="wrapper"><div className="horizontal-line"></div></div>
                    <div className="wrapper"><div className="horizontal-line"></div></div>
                </div>
                <div className="bottom-container">
                    <div className="sunrise-container">
                        <div className="title d-flex">
                            <img className="icon" src={SunriseIcon} alt="sunrise icon" width="22px" height="22px"/>
                            sunrise
                        </div>
                        <div className="wrapper">{props.sunrise}</div>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="sunset-container">
                        <div className="title d-flex">
                            <img className="icon" src={SunsetIcon} alt="sunset icon" width="22px" height="22px"/>
                            sunset
                        </div>
                        <div className="wrapper">{props.sunset}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AirInfo;
