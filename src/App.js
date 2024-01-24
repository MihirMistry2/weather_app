import { useState } from 'react';
import Empty from './components/empty/Empty';
import './App.css';

const App = () => {
    const [weatherDetails, setWeatherDetails] = useState(null);

    return (
        <div className="main-container d-flex align-items justify-content">
            {weatherDetails ? <>App</> : <Empty />}
        </div>
    );
};
export default App;
