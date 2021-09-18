import React from "react";
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
import {Title, Loc, TimDat, Description, RarityRating, TheCardDeck} from './Styling_Components/Fonts/cards.style'

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 5%;
    margin-bottom: 5%;
    text-align: left;
    
    
`

const DisplayCard = styled.section`
padding-bottom: 10%;
margin: 5%;
position: relative;
`



const SightingCards = (props) => {
  
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
    return props.sightings.map((sighting, index) => {
      return (
        <TheCardDeck>
        <Card>
        
        <CardBody key={index}>
          <Title>{sighting.bird}</Title>
          <Loc>@{sighting.location}</Loc>
          <CardImg
          top
          width="100%"
          src={sighting.image}
          alt="There should be a bird here"
        />
          
          <TimDat>Time:{sighting.time} Date:{sighting.date}<RarityRating>Rarity Rating: {sighting.rarity}</RarityRating></TimDat>
          <Description>{sighting.description}</Description>
          
          <Button color="warning" onClick={() => {props.editUpdateSighting(sighting); props.updateOn()}}> Edit </Button>

          <Button color="danger" onClick={() => {deleteSighting(sighting)}}>Delete</Button>
        </CardBody>
      </Card>
      </TheCardDeck>
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
          </CardDeck>
        </DisplayCard>
        </CardContainer>
    </div>
)
}

export default SightingCards;
