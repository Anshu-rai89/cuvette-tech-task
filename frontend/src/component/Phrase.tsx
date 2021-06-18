import React, { FunctionComponent } from "react";
import { Phrase } from "../types";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
const PhraseComponent: FunctionComponent<any> = (props) => {
  const handleDelete = async () => {
    try {
      // api call to delete phrase to mongo
      // TODO -> Move url to common folder with base URL & api version
      const res = await axios.delete(
        `http://localhost:7000/api/deletePhrase/${props.phrase.id}`
      );
      props.setUpdate(true);
    } catch (err) {
      alert(`Error in deleting phrase ${JSON.stringify(err)}`);
    }
  };

  // phrase is empty
  if (!props.phrase.phrase) {
    return <div></div>;
  }
  return (
    <div className="phrase">
      <Card body>
        <div className="flex-box">
          <div className="center">
            <h3>{props.phrase.id}</h3>
          </div>

          <div className="center">{props.phrase.phrase}</div>
          <div className="center">
            <Button onClick={handleDelete} variant="danger">
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PhraseComponent;
