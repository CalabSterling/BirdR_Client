import React, {useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import SightingCreate from './SightingCreate';
import SightingCards from './SightingCards';
import SightingEdit from './SightingEdit';
import styled from 'styled-components';

const NewBackground = styled.body`
    background-color: lightblue;
    height: 100%;
    width: 100vw;
    /* margin-top: -150px; */
    /* padding-top: 300px; */
`;

const IndexDiv = styled.div`
    margin-top: 0%;
    padding-top: 0%;
    display: block;
`;

const AddABird = styled.div `
    position: fixed;
    padding-top: 2%;
    padding-left: 75%;
    width: 100%;
    z-index: 98;
`


const SightingIndex = (props) => {
    const [sightings, setSightings] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [sightingToUpdate, setSightingToUpdate] = useState({});
    


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
            props.navbarSight(sightingData)
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
        <IndexDiv id="sightingIndex">
        <NewBackground> 
        <Container>
        <Row>
            <Col md="3">
            <AddABird>  
            <SightingCreate fetchSightings={fetchSightings} token={props.token}/>
            </AddABird>
            </Col>
                 <Col md="9">
                      <SightingCards sightings={sightings} fetchSightings={fetchSightings} editUpdateSighting={editUpdateSighting} updateOn={updateOn} token={props.token} updateSightingFeed={props.updateSightingFeed}/>
                </Col>
                {updateActive ? <SightingEdit sightingToUpdate={sightingToUpdate} updateOff={updateOff} token={props.token} fetchSightings={fetchSightings} /> : <></>}
        </Row>  
        </Container>
        
        </NewBackground>
        </IndexDiv>
    )
}

export default SightingIndex;
