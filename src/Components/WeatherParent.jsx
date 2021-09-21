import React, { useState, useEffect } from 'react';
import { Button, CardColumns, Modal, ModalHeader, ModalBody, ModalFooter,
 } from 'reactstrap';
import WeatherChild from './WeatherChild';


const WeatherParent = (props) => {
    const [weather, setWeather] = useState([]);
    const [modal, setModal] = useState(false);
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

    const toggle = () => setModal(!modal);

    useEffect(() => {
        const fetchURL = async () => {
            const response = await fetch(url);
            const data = await response.json();
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("15:00:00"))
            console.log(data);
            console.log(dailyData);
            setWeather(dailyData);
        };
        fetchURL();
    }, [url]);

    const displayWeather = () => weather.map((forecast, index) => <WeatherChild key={String(index)} forecast={forecast} />);

    return ( 
        <div>
            <Button onClick={toggle} className="sighting-button">Weather</Button>
            <div className="row justify-content-center">
            <Modal isOpen={modal} toggle={toggle} contentClassName="custom-modal-style">
                <ModalHeader toggle={toggle}>5 Day Forecast</ModalHeader>
                <ModalBody>
        
            <CardColumns>{displayWeather()}</CardColumns>
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle}>Close</Button>
            </ModalFooter>
            </Modal>
            </div>
        </div>
     );
};
 
export default WeatherParent;