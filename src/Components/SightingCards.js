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
const [likeData, setLikeData] = useState()
// const likeRecorder = (sighting) => {setLikeData(sighting.likes)};
// likeRecorder();
const [likeCount, setLikeCount] = useState(likeData);

  const updateLikes = (sighting, likeCount) => {
    // event.preventDefault();
    setLikeCount(likeCount + 1);
        fetch(`http://localhost:3000/sighting/updateLikes/${sighting.id}`, {
            method: `PUT`,
            body: JSON.stringify({
                sighting: {
                   likes: likeCount
                }}),
                headers: new Headers({
                  'Content-Type': 'application/json'
              })
          }).then((res) => {
              props.fetchSightings();
          })
    }

  const deleteSighting = (sighting) => {
    fetch(`http://localhost:3000/sighting/${sighting.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => props.fetchSightings());
  };

  function hoverHum(e) {
    Button.style.cursor = 'url("https://downloads.totallyfreecursors.com/cursor_files/hummingbird.cur"), url("https://downloads.totallyfreecursors.com/thumbnails/hummingbird1.gif"), auto;';
  }
  
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
          <Button onMouseOver={() => {hoverHum()}} onClick={() => {updateLikes()}}>Likes: {likeCount}</Button>
          
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
