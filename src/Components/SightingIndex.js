import React, {useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import SightingCreate from './SightingCreate';
import SightingCards from './SightingCards';
import SightingEdit from './SightingEdit';
import WeatherParent from './WeatherParent';


const SightingIndex = (props) => {
    const [sightings, setSightings] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [sightingToUpdate, setSightingToUpdate] = useState({});
    const [position, setPosition] = useState({ lat: 0, lon: 0 });
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success => {
          var lat = success.coords.latitude;
          var lon = success.coords.longitude;
          console.log(lon, lat)
          setPosition({ lat: lat, lon: lon })
        })
      }, []);

    const fetchSightings = () => {
        fetch('http://localhost:3000/sighting', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then( (res) => res.json())
        .then((sightingData) => {
            setSightings(sightingData)
           // console.log(sightingData);
        })
    }

  const editUpdateSighting = (sighting) => {
    setSightingToUpdate(sighting);
    console.log(sighting);
     }

    const updateOn = () => {
        setUpdateActive(true);
     }

    const updateOff = () => {
         setUpdateActive(false);
     }

    useEffect(() => {
        fetchSightings();
    }, [])

    return(
        <div>
        <Container>
            <Row>
                <Col md="3">
                     <SightingCreate fetchSightings={fetchSightings} token={props.token}/>
                 </Col>
                 <Col md="9">
                     <SightingCards sightings={sightings} fetchSightings={fetchSightings} editUpdateSighting={editUpdateSighting} updateOn={updateOn} token={props.token} />
                </Col>
                {updateActive ? <SightingEdit sightingToUpdate={sightingToUpdate} updateOff={updateOff} token={props.token} fetchSightings={fetchSightings} /> : <></>}
            </Row>
        </Container>
        <div>
           <WeatherParent position={position} /> 
        </div>

        </div>
    )
}

export default SightingIndex;
