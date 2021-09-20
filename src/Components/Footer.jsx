import React, { useState, useEffect } from 'react';

import WeatherParent from './WeatherParent';
import { Col, Row, CardDeck } from 'reactstrap';



const Footer = (props) => {
    const [position, setPosition] = useState({ lat: 0, lon: 0 });
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success => {
          var lat = success.coords.latitude;
          var lon = success.coords.longitude;
          console.log(lon, lat)
          setPosition({ lat: lat, lon: lon })
        })
      }, []);

    return ( 
        <div>
          <Row>
          {/* <Col className="col-md-2"> */}
          {/* <CardDeck> */}
            <WeatherParent position={position} />
          {/* </CardDeck> */}
          {/* </Col> */}
          </Row>
        </div>
     );
}
 
export default Footer;