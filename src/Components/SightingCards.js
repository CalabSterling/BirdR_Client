import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import ImageExpander from "./ImageExpander";



const SightingCards = (props) => {
  const [state, setState] = useState(false);
  const [image, setImage] = useState('');

  
  const deleteSighting = (sighting) => {
    fetch(`http://localhost:3000/sighting/${sighting.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => props.fetchSightings());
  };

  
  const sightingMapper = () => {
    return props.sightings.map((sighting, index, array) => {

      function expandImage(event) {
        event.preventDefault();
        setState(!state);
        setImage(sighting.image)
      }
      console.log(localStorage.getItem('ID'))
      console.log(sighting.owner_id.toString())
      console.log(props.updateSightingFeed)

      return (
      <div>
      { (sighting.owner_id.toString() === localStorage.getItem('ID') && props.updateSightingFeed === 'mine') ?
      <Card>
        <CardImg
          top
          width="100%"
          src={sighting.image}
          alt="There should be a bird here"
          onClick={expandImage}
        />
        <CardBody key={array[index]}>
          <CardTitle tag="h5">{sighting.bird}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {sighting.time}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {sighting.date}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {sighting.location}
          </CardSubtitle>
          <CardText>{sighting.description}</CardText>
          
          { sighting.owner_id.toString() === localStorage.getItem('ID') ? <Button color="warning" onClick={() => {props.editUpdateSighting(sighting); props.updateOn()}}> Edit </Button> : null }

          { localStorage.getItem('ID') === sighting.owner_id.toString() ? <Button color="danger" onClick={() => {deleteSighting(sighting)}}>Delete</Button> : null }
          
        </CardBody>
      </Card> : 
      
      (props.updateSightingFeed === 'global') ? 

        <Card>
          <CardImg
            top
            width="100%"
            src={sighting.image}
            alt="There should be a bird here"
            onClick={expandImage}
          />
          <CardBody key={array[index]}>
            <CardTitle tag="h5">{sighting.bird}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {sighting.time}
            </CardSubtitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {sighting.date}
            </CardSubtitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {sighting.location}
            </CardSubtitle>
            <CardText>{sighting.description}</CardText>
            
            { sighting.owner_id.toString() === localStorage.getItem('ID') ? <Button color="warning" onClick={() => {props.editUpdateSighting(sighting); props.updateOn()}}> Edit </Button> : null }

            { localStorage.getItem('ID') === sighting.owner_id.toString() ? <Button color="danger" onClick={() => {deleteSighting(sighting)}}>Delete</Button> : null }
            
          </CardBody>
        </Card> :
       <></> }
      </div>
      )
    }
    )
}
return (
  <div>
      <Card striped>
        <CardBody>
          {sightingMapper()}
          {state === true ? <ImageExpander image={image}/> : null}
        </CardBody>
      </Card>
    </div>
)
}

export default SightingCards;
