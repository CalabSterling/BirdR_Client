import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components';
import { BirdTitle, Information, SubmitButton, CloseButton } from './Styling_Components/create.style';
import APIURL from '../helpers/environment';

const Create = styled.div `
    font-family: 'Amatic SC', cursive;
    /* width: 200%; */
`;


const SightingCreate = (props) => {
    const [bird, setBird] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [rarity, setRarity] = useState('');
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [private1, setPrivate] = useState(false);

    const toggle = () => setModal(!modal);


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/sighting/sighting`, {
            method: 'POST',
            body: JSON.stringify({sighting: {bird: bird, location: location, time: time, date: date, description: description, image: image, rarity: rarity, private1: private1}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
        .then((logData) => {
            console.log(logData);
            setBird('');
            setLocation('');
            setTime('');
            setDate('');
            setDescription('');
            setImage('');
            setRarity('');
            setPrivate('');
            props.fetchSightings();
        });
    };

    const UploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "banana");
        setLoading(true);
        const res = await fetch (
            `https://api.cloudinary.com/v1_1/dcddchckg/image/upload`,
            {
                method: "POST",
                body: data,
            }
        )
        const File = await res.json();

        console.log(File.secure_url);
        setImage(File.secure_url)
        setLoading(false)
    };

    return(
        <Create>
            <Button onClick={toggle} className="sighting-button">Add a Bird</Button>
            <Modal isOpen={modal} toggle={toggle} id="add-a-bird">
                <ModalHeader toggle={toggle}><BirdTitle>Add A Bird!</BirdTitle></ModalHeader>
                <ModalBody>
            <Form onSubmit={handleSubmit}>
                <Information>
                <FormGroup>
                    <Label htmlFor="bird"/>
                    <Input name="bird" value={bird} placeholder="Bird" onChange={(e) => setBird(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="location"/>
                    <Input name="location" value={location} placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="time"/>
                    <Input type="time" name="time" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} > 
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="date"/>
                    <Input type="date" name="date" value={date} placeholder="Date" onChange={(e) => setDate(e.target.value)} > 
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="description"/>
                    <Input name="description" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Input type="file" name="file" placeholder="Upload image here" onChange={UploadImage} /> 
                    <br />
                    {loading ? (<h3>Loading...</h3>) : <img src={image} style={{width: "300px"}} alt="pic is here"/>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="rarity"/>
                    <Input type="select" name="rarity" placeholder="Rarity (Required)" value={rarity} onChange={(e) => setRarity(e.target.value)} >
                        <option value="" disabled selected>Rarity (Required)</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="private1"/>
                    <Input type="select" name="private1" placeholder="Privacy" value={private1} onChange={(e) => setPrivate(e.target.value)} >
                        <option value="" disabled selected>Privacy</option>
                        <option value="true">Private</option>
                        <option value="false">Public</option>
                    </Input>
                </FormGroup>
                </Information>
                <SubmitButton type="submit" onClick={toggle}>Click to Submit</SubmitButton>
            </Form>
            </ModalBody>
            <ModalFooter>
                <CloseButton onClick={toggle}>Close</CloseButton>
            </ModalFooter>
            </Modal>
            </Create>
    );
};

export default SightingCreate;