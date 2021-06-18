import React, { FunctionComponent, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { FormProps } from "../types";
import axios from "axios";
const PhraseForm: FunctionComponent<FormProps> = ({
  setShow,
  setUpdate,
  length,
}) => {
  const [phrase, setPhrase] = useState("");
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:7000/api/addPhrase",
        { phrase, id: length + 1 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("write req", res);
      setUpdate(true);
      setShow(false);
    } catch (err) {
      console.log("Error in adding", err);
    }
  };

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Phrase</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter Phrase"
              onChange={(e) => {
                setPhrase(e.target.value);
              }}
            />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Add Phrase
        </Button>
      </Form>
    </div>
  );
};

export default PhraseForm;
