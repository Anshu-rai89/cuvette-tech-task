import React, { FunctionComponent, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import CustomForm from "./PhraseForm";
const CustomModal: FunctionComponent<any> = (props) => {
  const { setUpdate, length } = props;
  const [show, setShow] = useState(false);
  return (
    <div>
      <Button variant="primary" onClick={() => setShow(true)}>
        Add Phrase
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Lets add Something
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomForm setShow={setShow} setUpdate={setUpdate} length={length} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomModal;
