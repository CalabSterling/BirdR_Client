import React from 'react';
import {
    Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import styled from 'styled-components';
// var moment = require('moment');

// const Weather = styled.div`
//     height: 10px;
//     width: 100%;
//     display: flex;
// `

const WeatherChild = (props) => {

    // let newDate = new Date();
    // const weekday = dailyData.dt * 1000
    // newDate.setTime(weekday)

    // const imgUrl = `owf owf-${dailyData.weather[0].id} owf-5x`

    return ( 
        
        <div>
        {/* <Weather> */}
        {/* <Row> */}
        <Col md="2">
        <Card className='e-card horizontal'>
        {/* <CardImg top width="100%" src={imgURL} alt="Card image cap" /> */}
        <CardBody>
            {/* <CardTitle tag="h5">{moment(newDate).format('dddd')}</CardTitle> */}
            {/* <CardSubtitle tag="h6" className="mb-2 text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</CardSubtitle> */}
            <CardSubtitle tag="h6" className="mb-2 text-muted">{props.temp} °F</CardSubtitle>
            <CardText>{props.feelslike} °F</CardText>
            <CardText>{props.description} </CardText>
            <Button>Button</Button>
        </CardBody>
        </Card>
        </Col>
        
        {/* </Row> */}
        {/* </Weather> */}
        </div>

     );
}
 
export default WeatherChild;