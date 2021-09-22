import React, { useState} from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import styled from "styled-components";

const ImageSize = styled.img `
    width: 150%;
    height: 150%;
`;

const ImageExpander = (props) => {
    const [modal, setModal] = useState(true);

    const toggle = () => setModal(!modal)

    return ( 
        <Modal isOpen={modal} toggle={toggle} contentClassName='custom-modal-style' style={{background: "transparent"}}>
            <ModalHeader toggle={toggle} ></ModalHeader>
            <ModalBody>
                {/* <ImageSize> */}
                <ImageSize src={props.image} className="expanded-image" />
                {/* </ImageSize> */}
            </ModalBody>
        </Modal>
     );
};
 
export default ImageExpander;