import React, { useState} from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";


const ImageExpander = (props) => {
    const [modal, setModal] = useState(true);

    const toggle = () => setModal(!modal)

    return ( 
        <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle} ></ModalHeader>
            <ModalBody>
                <img src={props.image}/>
            </ModalBody>
        </Modal>
     );
}
 
export default ImageExpander;