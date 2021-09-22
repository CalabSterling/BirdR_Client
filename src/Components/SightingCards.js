import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardDeck
} from "reactstrap";
import styled from "styled-components";
import ImageExpander from "./ImageExpander";
import {Title, Loc, TimDat, Description, RarityRating, TheCardDeck} from './Styling_Components/Fonts/cards.style'

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 5%;
    margin-bottom: 10%;
    text-align: left;
 
`

const DisplayCard = styled.section`
padding-bottom: 10%;
margin: 5%;
position: relative;
`




const SightingCards = (props) => {
  const [state, setState] = useState(false);
  const [image, setImage] = useState('');
  const [sightingIndex, setSightingIndex] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  
    console.log(props.sightings)

  const deleteSighting = (sighting) => {
    fetch(`http://localhost:3000/sighting/${sighting.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => props.fetchSightings());
  };

    const UpdateLikes = (sighting) => {
            setLikeCount(likeCount + 1);
    if(sighting === undefined) {
        console.log("nothing here")
    } else {
        fetch(`http://localhost:3000/sighting/updateLikes/${sighting.id}`, {
      method: `PUT`,
      body: JSON.stringify({
        sighting: {
          likes: likeCount
        }}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
    }).then((res) => {props.fetchSightings()})
    }}

  function hoverHum(e) {
    Button.style.cursor = 'url("https://downloads.totallyfreecursors.com/cursor_files/hummingbird.cur"), url("https://downloads.totallyfreecursors.com/thumbnails/hummingbird1.gif"), auto;'
  }


  
  const sightingMapper = () => {
    return props.sightings.map((sighting, index, array) => {
      console.log(sighting.owner_id)
      function expandImage(event) {
        event.preventDefault();
        setState(!state);
        setImage(sighting.image)
      }

      return (
        <div>
        { (sighting.owner_id.toString() === localStorage.getItem('ID') && props.updateSightingFeed === 'mine') ?
        <TheCardDeck>
        <Card>
        
        <CardBody key={[index]}>
          <Title>{sighting.bird}</Title>
          <Loc>@{sighting.location}</Loc>
          <CardImg
          top
          width="100%"
          src={sighting.image}
          alt="There should be a bird here"
          onClick={expandImage}
        />
          
          <TimDat>Time:{sighting.time} Date:{sighting.date}<RarityRating>Rarity Rating: {sighting.rarity}</RarityRating></TimDat>
          <Description>{sighting.description}</Description>
          
          <Button onClick={() => {UpdateLikes(sighting)}}>Like</Button>

          { sighting.owner_id.toString() === localStorage.getItem('ID') ? <Button color="warning" onClick={() => {props.editUpdateSighting(sighting); props.updateOn()}}> Edit </Button> : null }

          { localStorage.getItem('ID') === sighting.owner_id.toString() ? <Button color="danger" onClick={() => {deleteSighting(sighting)}}>Delete</Button> : null }
          
        </CardBody>
      </Card>
      </TheCardDeck> : 

        (props.updateSightingFeed === 'global') ? 

        <TheCardDeck>
        <Card>
        
        <CardBody key={[index]}>
          <Title>{sighting.bird}</Title>
          <Loc>@{sighting.location}</Loc>
          <CardImg
          top
          width="100%"
          src={sighting.image}
          alt="There should be a bird here"
          onClick={expandImage}
        />
          
          <TimDat>Time:{sighting.time} Date:{sighting.date}<RarityRating>Rarity Rating: {sighting.rarity}</RarityRating></TimDat>
          <Description>{sighting.description}</Description>
          
          <Button onClick={() => {UpdateLikes(sighting)}}>Like</Button>

          { sighting.owner_id.toString() === localStorage.getItem('ID') ? <Button color="warning" onClick={() => {props.editUpdateSighting(sighting); props.updateOn()}}> Edit </Button> : null }

          { localStorage.getItem('ID') === sighting.owner_id.toString() ? <Button color="danger" onClick={() => {deleteSighting(sighting)}}>Delete</Button> : null }
          
        </CardBody>
      </Card>
      </TheCardDeck> : 
      <></>}

      </div>
      )
    }
    )
}
return (
  <div>
    <CardContainer>
    <DisplayCard>
          <CardDeck>
          {sightingMapper()}
          {state === true ? <ImageExpander image={image}/> : null}
          </CardDeck>
        </DisplayCard>
        </CardContainer>
        </div>
          
)
}


export default SightingCards;
