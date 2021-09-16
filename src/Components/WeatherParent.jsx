import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';


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
        // setWeather(data.main);
    };

    const handleClick=(event)=>{
        event.preventDefault();
        fetchURL();
    };

    return ( 
        <div>
            <Button onClick={handleClick}>Click for Weather</Button>
        </div>
     );
}
 
export default WeatherParent;