import React, { useState, useEffect } from 'react';
import { Button, CardColumns, Modal } from 'reactstrap';
import WeatherChild from './WeatherChild';


const WeatherParent = (props) => {
    const [weather, setWeather] = useState([]);
    console.log (props.position)
    const key = '507c0093dc310b7d686f061c38a076e9';
    let lat = (props.position.lat);
    let lon = (props.position.lon);
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;

   if('geolocation' in navigator) {
       console.log('geolocation is available')
   } else {
       console.log('geolocation is not available')
   };
    
   const fetchURL = async () => {
        const response = await fetch(url);
        const data = await response.json();
        const dailyData = data.list.filter(reading => reading.dt_txt.includes("15:00:00"))
        console.log(data);
        console.log(dailyData);
        setWeather(dailyData);
    };

    const handleClick=(event)=>{
        event.preventDefault();
        fetchURL();
    };

    function displayWeather () {
        return (weather.map(dailyData => <WeatherChild key={dailyData.weather[0]} temp={dailyData.main.temp} feelslike={dailyData.main.feels_like} description={dailyData.weather[0].description} />))
    }

    return ( 
        <div>
            <Button onClick={handleClick}>Click for Weather</Button>
        
            <CardColumns>{displayWeather()}</CardColumns>
        
        </div>
     );
};
 
export default WeatherParent;