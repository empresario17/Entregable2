import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ClimaApp = () => {

    useEffect(() => {
        function success(pos) {
            const crd = pos.coords;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=6d9c5a719211a48c4ba5235cedda05d4`)
            .then(res => setIsweather(res.data))
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }, [])

const [isweather, setIsweather] = useState({})

const [isFarenheit, setIsFarenheit] = useState(true)

console.log(isweather)

const tempKelvin = `${isweather.main?.temp}`;
    const tempFarenheit = (tempKelvin - 273.15) * (9 / 5 + 32).toFixed(1)
    const tempCelcius = (tempKelvin - 273.15).toFixed(2)

    const tempChange =() =>{
        setIsFarenheit(!isFarenheit)
    }

    return (
        <div>
            <h1>Weather App</h1>
            <ul>
                <li>Country {isweather.sys?.country}</li>
                <li>Wind Speed  {isweather.wind?.speed}</li>
            </ul>
    <img src={`http://openweathermap.org/img/wn/${isweather.weather?.[0].icon}@2x.png`}alt='' ></img> 

    <span>Clouds: {isweather.clouds?.all} %</span>

    <div className='container-termometer-icon'>
        <i className="fa-solid fa-temperature-three-quarters"></i>
            <p> {isweather.main?.temp ? (isFarenheit ? tempFarenheit : tempCelcius) : "0" } <br /> {isFarenheit ? "°F" : "°C"}</p>
            <button onClick={tempChange}> Change Temperature</button>
</div>
        </div>
    );
};

export default ClimaApp;

