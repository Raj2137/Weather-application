import HourlyForcast from './Components/HourlyForcast';
import Inputs from './Components/Inputs';
import TemperandDetlis from './Components/TemperandDetlis';
import TimeandLocation from './Components/TimeandLocation';
import Topmenu from './Components/Topmenu';
 
import getFormattedWeatherData from './Service/WeatherService';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {

    const [query, setQuery] = useState({q: 'hyderabad'})
    const [units, setUnits] = useState('metric')
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const fetchWeather = async ()=> {
          const message = query.q ? query.q : 'current location.'
          toast.info("Fetching weather for "+ message);
            await getFormattedWeatherData({...query, units}).then(
                (data)=> {

                    toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
                    setWeather(data)
                }
            );
            
        }
        fetchWeather();
    }, [query, units]); //fetch the data everytime either query or units changes.

    const formatBackground = () => {
        if (!weather) return "from-cyan-700 to-blue-700";
        const threshold = units === "metric" ? 29: 60;
        if (weather.temp<= threshold) return "from-cyan-700 to-blue-700";
        return "from-yellow-700 to-orange-700";
    };
  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
     <Topmenu setQuery= {setQuery}/>
     <Inputs  setQuery= {setQuery} units= {units} setUnits= {setUnits}/>

     {weather && (
        <div>
          <TimeandLocation weather={weather}/>
          <TemperandDetlis weather= {weather}/>
          <HourlyForcast title="hourly forecast" items={weather.hourly}/>
          <HourlyForcast title="Daily forecast" items={weather.daily}/>
        </div>
     )}
     <ToastContainer autoClose={2000} theme='colored' newestOnTop={true}/>
    </div>
  );
}

export default App;
