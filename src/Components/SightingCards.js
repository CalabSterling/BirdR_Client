import React, {useState} from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap"; 

const SightingCards = (props) => {
const [likeCount, setLikeCount] = useState(0);
const totalLikes = 
  likeCount > 0
      ?    `${likeCount} likes` : `Like`;

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
    return props.sightings.map((sighting, index) => (
      <Card>
        <CardImg
          top
          width="100%"
          src={sighting.image}
          alt="There should be a bird here" />
        <CardBody key={index}>
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
          <CardText>{totalLikes}</CardText>
          <Button
            color="danger"
            onClick={() => {
              deleteSighting(sighting);
            } }
          >
            Delete
          </Button>
          <Button onClick={() => setLikeCount(likeCount + 1)}>Like</Button>
          
          <Button color="warning" onClick={() => {props.editUpdateSighting(sighting); props.updateOn()}}> Edit </Button>

          <Button color="danger" onClick={() => {deleteSighting(sighting)}}>Delete</Button>
        </CardBody>
      </Card>
    )
    )
};

return (
  <div>
      <Card striped>
        <CardBody>
          {sightingMapper()}
        </CardBody>
      </Card>
    </div>
)
}
export default SightingCards;
