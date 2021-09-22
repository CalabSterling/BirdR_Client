import React, { useState} from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ImageExpander = (props) => {
    const [modal, setModal] = useState(true);

    const toggle = () => setModal(!modal)

    return ( 
        <Modal isOpen={modal} toggle={toggle} contentClassName="custom-modal-style">
            <ModalHeader toggle={toggle} ></ModalHeader>
            <ModalBody>
                {/* <ImageSize> */}
                <img src={props.image} id="expanded-image" />
                {/* </ImageSize> */}
            </ModalBody>
        </Modal>
     );
};
 
export default ImageExpander;