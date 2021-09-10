import { prependOnceListener } from "process";
import React, { useState } from "react";
import { CardBody, Card } from "reactstrap";

const SightingTable = () => { 
    const deleteSighting = (sighting) => {
        fetch(`http:localhost:3000/sighting/${sighting.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Authorization' : props.token
            })
        })
        .then(() => props.fetchSightings())
    }
    const sightingMap = () => {
        return props.sighting.map((sighting, index) => {
            return(
                <Container>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>{sighting.bird}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Container>
            )
        })
    }
}

    return(
        <div>
            <p>just testing this bad boy out</p>

        </div>
    )
        

export default SightingTable;
