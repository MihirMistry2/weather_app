import Search from '../Search';
import LogoImg from '../../assets/images/logo.png';
import '../../sass/Empty.scss';

/**
 * This component renders a empty screen with search engine.
 * @param {Props} props
 * @returns {React.ReactElement} React element that renders a search input with a button.
 */
export const Empty = ({ forwardedRef }) => {
    return (
        <div className="empty-screen-container">
            <Search ref={forwardedRef} />
            <div className="logo-container d-flex-column align-items justify-content">
                <div className="logo-wrapper">
                    <img id="logo-img" className="logo-img" src={LogoImg} alt="logo img" width="200px" height="200px" />
                </div>
                <div className="msg-wrapper">allow location access or search via city name.</div>
            </div>
        </div>
    );
};
export default Empty;
