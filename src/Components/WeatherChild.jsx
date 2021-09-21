import React from 'react';
import {
    Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
  } from 'reactstrap';
  import styled from 'styled-components';
  var moment = require('moment');

const Weather = styled.div`
    text-align: center;
`

const WeatherChild = (props) => {
    const {temp, feels_like} = props.forecast.main;
    const {description, icon} = props.forecast.weather[0];
    let newDate = new Date();
    const weekday = props.forecast.dt * 1000
    newDate.setTime(weekday)

    const imgUrl = `owf owf-${props.forecast.weather[0].id} owf-5x`

    return ( 
        
        <div>
        <Weather>
        <Row>
        <Col md="112">
        <Card id="temp">
        {/* <CardImg top width="100%" src={imgUrl} alt="Card image cap" /> */}
        <CardBody id="temp">
            <CardTitle tag="h5">{moment(newDate).format('dddd')}</CardTitle>
            <CardSubtitle>{moment(newDate).format('MMMM Do, h:mm a')}</CardSubtitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted"> Temperature: {Math.round(temp)} °F</CardSubtitle>
            <CardText tag="h6" className="mb-2 text-muted">Feels Like: {Math.round(feels_like)} °F</CardText>
            <CardText>{description}</CardText>
        </CardBody>
        </Card>
        </Col>
        
        </Row>
        </Weather>
        </div>

     );
}
 
export default WeatherChild;