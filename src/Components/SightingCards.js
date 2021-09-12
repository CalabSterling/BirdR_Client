import React from "react";
import { CardBody, Card } from "reactstrap";

const SightingCards = () => {
  const deleteSightings = (sighting) => {
    fetch(`http:localhost:3000/sighting/${sighting.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => props.fetchSightings());
  };
  const sightingMapper = () => {
    return props.sightings.map((sighting, index) => {
      return (
        <Container>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body key={index}>
              <Card.Title>{sighting.bird}</Card.Title>
              <Card.Text>{sighting.location}</Card.Text>
              <Card.Text>{sighting.time}</Card.Text>
              <Card.Text>{sighting.date}</Card.Text>
              <Card.Text>{sighting.description}</Card.Text>
              <Card.Text>{sighting.rarity}</Card.Text>  
              <Button color="danger" onClick={() =>{deleteSightings(sighting)}}>Delete Post</Button>
            </Card.Body>
          </Card>
        </Container>
      );
    });
  };
return(
<>

<h1>Checkout These Sightings!</h1>
<hr/>
  <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            {sightingMapper}
            <Card.Title></Card.Title>
            <Card.Text>Location:</Card.Text>
            <Card.Text>Time:</Card.Text>
            <Card.Text>Date:</Card.Text>
            <Card.Text>Description:</Card.Text>
            <Card.Text>Rarity:</Card.Text>
          </Card.Body>
        </Card>
</>
    );
};



export default SightingCards;
