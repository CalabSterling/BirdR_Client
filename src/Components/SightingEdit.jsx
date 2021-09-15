import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const SightingEdit = (props) => {
    const [editBird, setEditBird] = useState(props.sightingToUpdate.bird);
    const [editLocation, setEditLocation] = useState(props.sightingToUpdate.location);
    const [editTime, setEditTime] = useState(props.sightingToUpdate.time);
    const [editDate, setEditDate] = useState(props.sightingToUpdate.date);
    const [editDesc, setEditDesc] = useState(props.sightingToUpdate.description);
    const [editImage, setEditImage] = useState(props.sightingToUpdate.image);
    const [editRarity, setEditRarity] = useState(props.sightingToUpdate.rarity);

    const sightingUpdate = (event, sighting) => {
        event.preventDefault();
        fetch(`http://localhost:3000/sighting/update/${props.sightingToUpdate.id}`, {
            method: `PUT`,
            body: JSON.stringify({
                sighting: {
                    bird: editBird,
                    location: editLocation,
                    time: editTime,
                    date: editDate,
                    description: editDesc,
                    image: editImage,
                    rarity: editRarity
                }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => {
            props.fetchSightings();
            props.updateOff();
        })
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Enter a Sighting</ModalHeader>
            <ModalBody>
                <Form onSubmit={sightingUpdate}>
                    <FormGroup>
                        <Input name="bird" value={editBird} onChange={(e) => setEditBird(e.target.value)} placeholder="Enter Bird Name" />
                    </FormGroup>
                    <FormGroup>
                        <Input name="location" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} placeholder="Enter Location" />
                    </FormGroup>
                    <FormGroup>
                        <Input name="time" value={editTime} onChange={(e) => setEditTime(e.target.value)} placeholder="Enter Sighting Time" />
                    </FormGroup>
                    <FormGroup>
                        <Input name="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} placeholder="Enter Sighting Date" />
                    </FormGroup>
                    <FormGroup>
                        <Input name="description" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} placeholder="Enter Bird Description" />
                    </FormGroup>
                    <FormGroup>
                        <Input name="image" value={editImage} onChange={(e) => setEditImage(e.target.value)} placeholder="Enter Image URL" />
                    </FormGroup>
                    <FormGroup>
                        <Input name="rarity" value={editRarity} onChange={(e) => setEditRarity(e.target.value)} placeholder="Enter Rarity" />
                    </FormGroup>
                    <Button type="submit">Update</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default SightingEdit;