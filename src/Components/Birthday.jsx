import React from "react";
import { 
    Modal, 
    ModalHeader,  
    ModalBody 
} from 'reactstrap';
import styled from "styled-components";

const Birthday = (props) => {
    return ( 
        <Modal>
            <ModalHeader>Happy Birthday, {props.firstName}</ModalHeader>
            <ModalBody>
                BirdR wants to wish you a Happy Birthday!
            </ModalBody>
        </Modal>
     );
}
 
export default Birthday;