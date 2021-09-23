import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';

const SightingEdit = (props) => {
    const [editBird, setEditBird] = useState(props.sightingToUpdate.bird);
    const [editLocation, setEditLocation] = useState(props.sightingToUpdate.location);
    const [editTime, setEditTime] = useState(props.sightingToUpdate.time);
    const [editDate, setEditDate] = useState(props.sightingToUpdate.date);
    const [editDesc, setEditDesc] = useState(props.sightingToUpdate.description);
    const [editImage, setEditImage] = useState(props.sightingToUpdate.image);
    const [editRarity, setEditRarity] = useState(props.sightingToUpdate.rarity);
    const [loading, setLoading] = useState(false);

    const sightingUpdate = (event, sighting) => {
        event.preventDefault();
        console.log(props);
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

    const UploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "malamar");
        setLoading(true);
        const res = await fetch (
            `https://api.cloudinary.com/v1_1/dmvbiwqqd/image/upload`,
            {
                method: "PUT",
                body: data,
            }
        )
        const File = await res.json();
        
        console.log(File);
        console.log(File.secure_url);
        setEditImage(File.secure_url)
        setLoading(false)
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Enter a Sighting</ModalHeader>
            <ModalBody>
                <Form onSubmit={sightingUpdate}>
                    <FormGroup>
                        <Label>Bird</Label>
                        <Input name="bird" value={editBird} onChange={(e) => setEditBird(e.target.value)} placeholder="Enter Bird Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Location</Label>
                        <Input name="location" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} placeholder="Enter Location" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Time</Label>
                        <Input name="time" value={editTime} onChange={(e) => setEditTime(e.target.value)} placeholder="Enter Sighting Time" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Date</Label>
                        <Input name="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} placeholder="Enter Sighting Date" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input name="description" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} placeholder="Enter Bird Description" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="file" name="file" placeholder="Upload image here" onChange={UploadImage} /> 
                        <br />
                        {loading ? (<h3>Loading...</h3>) : <img src={editImage} style={{width: "300px"}} alt="pic is here"/>}
                    </FormGroup>
                    <FormGroup>
                        <Label>Rarity</Label>
                        <Input type="select" name="rarity" placeholder="Rarity" value={editRarity} onChange={(e) => setEditRarity(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Input>
                    </FormGroup>
                    <Button type="submit">Update</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}


export default SightingEdit;